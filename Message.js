import { React, forwardRef } from 'react'
import { CardContent, Card, Typography, useRadioGroup } from "@mui/material"
import Message_css from '../Message.css'

const Message = forwardRef((props, ref) => {
    const { userName, message } = props.message
    const isUser = props.userName === userName

    return (
        <div ref={ref} className={`message ${isUser && 'message_user'} `} >
            <Card className={isUser ? 'message_userCard' : 'message_guestCard'}>
                <CardContent>
                    <Typography
                        variant="h5"
                        component="h2"
                        color="black">
                        {!isUser && `${userName}:`}{message}
                    </Typography>
                </CardContent>
            </Card >
        </div >

    )

})
export default Message
