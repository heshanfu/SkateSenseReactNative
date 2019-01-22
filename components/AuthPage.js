import React, { Component } from 'react';
import { Keyboard, Text, View, YellowBox, StyleSheet } from 'react-native'
import { Input, Button, ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation'
import environment from '../environment.js'


class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  onSubmit= () =>{
      console.log('got here!')
  }

  onSignUp= () =>{
    console.log('clicked Signup');
  }


  render(){
    const styles = StyleSheet.create({
      container: {
        flex: 0,
        marginTop: 200,
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
    });


    return(
      <View style={styles.container}>
        <Text style={styles.header}>SkateSense</Text>

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
            onPress={() => this.props.navigation.navigate('Map')}
          />

          <Button
            icon={
              <Icon
                name='arrow-right'
                size={15}
                color='white'
              />
            }
            title='Sign Up'
            buttonStyle={{
              marginTop: 20,
              backgroundColor: "grey",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 20
            }}
            onPress={() => this.props.navigation.navigate('SignUp')}
          />


      </View>
    )
  }
}





export default withNavigation(Login)
