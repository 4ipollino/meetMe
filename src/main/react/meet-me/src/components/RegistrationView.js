import React, {Component} from 'react';
import axios from 'axios';

class RegistrationView extends Component
{
    requestOptions = {
        timeout: 8000
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            email: '',
            password: '',
            repeatPass: ''
        };
    }

    handleChange = event => {
        this.setState({[event.target.name] :  event.target.value});
    }

    Validate() {
        try {
            return (
                this.state.email.length > 0 &&
                this.state.password.length > 0 &&
                this.state.repeatPass.length > 0 &&
                this.state.email.match('.+@.+\\..+') !== null &&
                this.state.password === this.state.repeatPass
            );
        }
        catch (e) {
            console.log(e.message);
            return false;
        }
    }

    //TODO: add password encryption
    User() {
        return(
            {
                email: this.state.email,
                password: this.state.password
            }
        );
    }

    signUp = event => {
        event.preventDefault();

        axios
            .post('http://localhost/register', this.User(), this.requestOptions)
            .then(res => { this.history.pushState(null, "Login", "/login") })
            .catch(err => {
                    console.log(err.response.data.message);
                    alert(err.response.data.message);
                }
            );
    }

    render() {
        const isEnabled = this.Validate();
        return (
            <div>
                <div className="login-back">
                    <h1>Registration</h1>
                    <div className="form-css">
                        <form>
                            <div className="form-row">
                                <label className="form-label">Email</label>
                                <input type="text" name="email" id="email" className="text-input" value={this.state.email} onChange={this.handleChange}/>
                            </div>
                            <div className="form-row">
                                <label className="form-label">Password</label>
                                <input type="password" name="password" id="password" className="text-input" value={this.state.password} onChange={this.handleChange}/>
                            </div>
                            <div className="form-row">
                                <label className="form-label">Repeat Password</label>
                                <input type="password" name="repeatPass" id="repeatPass" className="text-input" value={this.state.repeatPass} onChange={this.handleChange}/>
                            </div>
                            <div className="form-row">
                                <button className="btn-def" disabled={!isEnabled} onClick={this.signUp}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationView;