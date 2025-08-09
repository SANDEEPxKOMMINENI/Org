import { Router } from 'express'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const router = Router()
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20'
})

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, userId } = req.body

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      client_reference_id: userId,
    })

    res.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout session error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Stripe webhook handler
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return res.status(400).send('Webhook signature verification failed')
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        await handleSubscriptionCreated(session)
        break
      
      case 'customer.subscription.updated':
        const subscription = event.data.object
        await handleSubscriptionUpdated(subscription)
        break
      
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object
        await handleSubscriptionDeleted(deletedSubscription)
        break
    }

    res.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    res.status(500).json({ error: 'Webhook handler failed' })
  }
})

async function handleSubscriptionCreated(session: any) {
  const userId = session.client_reference_id
  
  // Update user's plan in database
  await supabase
    .from('users')
    .update({ 
      plan_id: 'pro', // Map this based on the price ID
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
}

async function handleSubscriptionUpdated(subscription: any) {
  // Handle subscription updates
  console.log('Subscription updated:', subscription.id)
}

async function handleSubscriptionDeleted(subscription: any) {
  // Handle subscription cancellation
  console.log('Subscription deleted:', subscription.id)
}

module.exports = router