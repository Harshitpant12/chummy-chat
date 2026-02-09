import React, { useState } from 'react'

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    })

    return (
        <div>
        SignUp
        </div>
    )
}

export default SignUpPage
