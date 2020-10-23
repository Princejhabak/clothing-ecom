import React from 'react'
import './stripe-button.styles.scss'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton=({price})=>{
    const priceForStripe= price*100
    const publishKey='pk_test_z7ebgAK55YalVIYBPDoYrCiA00mzhpw6ed'
    const onToken=token=>{
        // console.log(token) 
        // alert('Payment Successful')

        axios({
            url:'payment',
            method:'post',
            data:{
                amount:priceForStripe,
                token
            }
        }).then(response =>{
            alert('payment successful')
        }).catch(error =>{
            console.log("Payment error:",JSON.parse(error))
            alert("There was an issue with your payment")
        })
    }

    return (
        <StripeCheckout
        label='Pay Now'
        name='CRWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://sendeyo.com/up/d/f3eb2117da'
        description={`Your total price is $${price}`}
        amount={priceForStripe}
        token={onToken}
        stripeKey={publishKey}
         />
    )
    
}

export default StripeCheckoutButton