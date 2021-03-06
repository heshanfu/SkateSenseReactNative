import React, {Component} from 'react'
import { Keyboard, Text, StyleSheet, View } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ThemeProvider } from 'react-native-elements';
import { withNavigation } from 'react-navigation'
import { createUser } from '../action.js'
import { connect } from 'react-redux'
import { compose } from 'redux'

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    validatePassword: '',
    email: '',
    firstName: 'n/a',
    lastName: 'n/a',
    photo: 'n/a',
    passwordMustMatch: false
  }


  onSubmit = () =>{
    // console.log('got here')
    if (this.state.password === this.state.validatePassword){
      this.props.createUser(this.state.username,
        this.state.password,
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.photo
      )
      // this.props.navigation.navigate('Map')
    }else {
      this.setState({passwordMustMatch: true})
    }
  }

  render(){
    const styles = StyleSheet.create({
      container: {
        flex: 0,
        marginTop: 75,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'white'
      },
      header: {
        fontFamily: 'Lobster',
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 80
      },
    })

    return(
      <View style={styles.container}>
        <ThemeProvider>
          <Text style={styles.header}>Signup</Text>


          <View>
            <Text style={{color:'red'}}>
              {this.state.passwordMustMatch ? 'Passwords Must Match' : null}
            </Text>
          </View>

          <Input
            placeholder='Username'
            leftIcon={
              <Icon
                name='user'
                size={24}
                color='black'
              />
            }
            clearButtonMode={'never'}
            autoCapitalize={'none'}
            autoCorrect={false}
            autoFocus={true}
            keyboardType="default"
            onChangeText={(username) => this.setState({username})}
            />

            <Input
              placeholder='Password'
              autoCapitalize={'none'}
              autoCorrect={false}
              clearButtonMode={'never'}
              secureTextEntry={true}
              leftIcon={
                <Icon
                  name='lock'
                  size={24}
                  color='black'
                />
              }
              onChangeText={(password) => this.setState({password})}
            />

            <Input
              placeholder='Confirm password'
              autoCapitalize={'none'}
              autoCorrect={false}
              clearButtonMode={'never'}
              secureTextEntry={true}
              leftIcon={
                <Icon
                  name='lock'
                  size={24}
                  color='black'
                />
              }
              onChangeText={(validatePassword) => this.setState({validatePassword})}
            />

              <Input
                placeholder='Email'
                leftIcon={
                  <Icon
                    name='envelope'
                    size={17}
                    color='black'
                  />
                }
                clearButtonMode={'never'}
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={'email-address'}
                onChangeText={(username) => this.setState({username})}
                />


                <Button
                  icon={
                    <Icon
                      name='arrow-right'
                      size={15}
                      color='white'
                    />
                  }
                  title='Submit'
                  buttonStyle={{
                    marginTop: 20,
                    backgroundColor: "rgb(244, 2, 87)",
                    width: 300,
                    height: 45,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 20
                  }}
                  onPress={this.onSubmit}
                />


        </ThemeProvider>
      </View>
    )
  }
}


const mapStateToProps = ({ user: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})


const connectMap = connect(mapStateToProps, { createUser })

export default withNavigation(compose(connectMap)(SignUp))
