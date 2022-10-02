import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import Script from 'next/script'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [pword, setPassword] = useState('')
  const [pword1, setPword1] = useState('')

  const handleRegularLogin = async (_email, _pword) => {
    try{
        const { user, session, error } = await supabase.auth.signInWithPassword({
            email: _email,
            password: _pword
        })

        if (error) {
            throw error
        } else {
            alert('Login Successful!')
        }
    } catch (error) {
        alert(error.error_description || error.message)
    }
  }

  const handleNewReg = async (_email, _pword1, _pword2) => {
    try{
        if (_pword1 === _pword2){
            const { user, session, error} = await supabase.auth.signUp({
                email: _email,
                password: _pword1
            })
        } else {
            alert('Both Entered Passwords do not match!')
        }

        if(error) {
            throw error
        } else {
            alert('New User Created!')
        }
    } catch (error) {
        alert(error.error_description || error.message)
    }
  }

  return (
    <div>
        <div id="login" className="section-p1">
            <div className="main">
                <div className="sign-in" id="bottom">
                    <span>Email</span>
                    <input 
                        type="email" 
                        placeholder="Your Email" 
                        id="ename" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span>Password</span>
                    <input 
                        type="password" 
                        placeholder='Your Password'
                        id="pass" 
                        value={pword}
                        onChange={(e) =>setPassword(e.target.value)}
                    />
                    <button 
                        className="normal"
                        onClick={(e) => {
                            e.preventDefault()
                            handleRegularLogin(email, pword)
                        }}
                    >
                        Login
                    </button>
                    <p>Dont have an account?</p>
                    <button 
                        className="su normal" 
                        id="su"
                    >
                        <i>Sign Up</i>
                    </button>
                </div>
                <div className="sign-up" id="bottom">
                    <p></p>
                    <span>E-mail</span>
                    <input 
                        type="email" 
                        placeholder="E-mail ID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        id="email"
                    />
                    <p></p>
                    <span>Password</span>
                    <input 
                         type="password" 
                         placeholder='Your Password'
                         id="pass" 
                         value={pword}
                         onChange={(e) =>setPassword(e.target.value)}
                    />
                    <p></p>
                    <span>Confirm Password</span>
                    <input 
                         type="password" 
                         placeholder='Confirm Your Password'
                         id="pass1" 
                         value={pword1}
                         onChange={(e) =>setPword1(e.target.value)}
                    />
                    <p></p>
                    <button 
                        className="normal" 
                        id="signup"
                        onClick={(e) => {
                            e.preventDefault()
                            handleNewReg(email, pword, pword1)
                        }}
                    >
                        Sign Up
                    </button>
                    <p>Already have an account?</p>
                    <button 
                        className="si normal" 
                        id="si"
                    >
                        <i>Sign In</i>
                    </button>
                </div>
            </div>
            <div className="trans" id="top"></div>
        </div>
        <Script>
            {
               `var su=document.getElementById("su");
                var si=document.getElementById("si");
                var trans=document.getElementById("top");
                var s=document.getElementById("signup");
                su.onclick = function(){
                    trans.style.left="147px";
                    trans.style.borderTopLeftRadius = "1pc";
                    trans.style.borderBottomLeftRadius = "1pc";
                    trans.style.borderTopRightRadius = "0";
                    trans.style.borderBottomRightRadius = "0";
                    trans.style.transition = "0.6s ease";
                }
                si.onclick = function(){
                    trans.style.left="446px";
                    trans.style.borderTopLeftRadius = "0";
                    trans.style.borderBottomLeftRadius = "0";
                    trans.style.borderTopRightRadius = "1pc";
                    trans.style.borderBottomRightRadius = "1pc";
                };`
            }
        </Script>
    </div>
  )
}