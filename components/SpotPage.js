import React, {Component} from 'react'
import { View,
         Text,
         StyleSheet,
         Image,
         ScrollView,
         Linking,
         TouchableWithoutFeedback,
         TextInput} from 'react-native'
import { Header, Icon, Card, ListItem, Button, Divider } from 'react-native-elements'
import environment from '../environment.js'
import { withNavigation } from 'react-navigation'
import deviceStorage from '../deviceStorage.js'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {widthPercentageToDP as wp,
        heightPercentageToDP as hp} from 'react-native-responsive-screen';


const comments = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']

const styles = StyleSheet.create({
  commentContainer:{
    position: 'relative',
    flexWrap: 'wrap',
    height: hp('23%'),
    width: wp('100%'),
  },
  oneCommentContainer:{
    paddingBottom: 20,
    width: wp('85%'),
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },
  commentContent:{
    alignItems:'flex-start',
  },
  trashIcon:{
    alignSelf:'flex-end',
  },
  commentInputandButtonContainer:{
    flexDirection: 'row',
    marginTop: hp('40%'),
    position: 'absolute'
  },
  commentInput:{
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingLeft: wp('2%'),
    paddingRight: '2%',
    width: wp('65%'),
    marginLeft: wp('2%'),
    marginRight: wp('2')
  },
  postButton:{
    color:'black',
    borderRadius:20,
    backgroundColor: "rgb(244, 2, 87)",
    width: wp('20%'),
  },
  cardContainer:{
    paddingBottom:'50%',
    borderRadius: 20,
    height: hp('80%'),
  },
  cardImage:{
    height: hp('30%'),
  },
  divider:{
    backgroundColor: 'grey',
    borderWidth:.2,
    marginTop: hp('10%')}
})

class SpotPage extends Component {
  constructor(props){
    super(props)
    this.state={
      skatespot: '',
      imageURL: '',
      comments: [],
      extendCommentsAndCommentField: false,
      commentContent: '',
    }
  }

  componentDidMount(){
    this.setState({
      skatespot: this.props.navigation.getParam('skatespot'),
      imageURL: this.props.navigation.getParam('skatespot').skatephoto.url,
    })
    if (this.props.navigation.getParam('skatespot').comments) {
      this.setState({comments: this.props.navigation.getParam('skatespot').comments.map(comment => comment)})
    }

  }

  onCommentChange = (comment) => {
    this.setState({
      commentContent: comment
    })
  }

  deleteComment = (comment) => {
    deviceStorage.loadJWT('jwt')
    .then(key => fetchToDeleteComment(key, comment.id))

    function fetchToDeleteComment(key, commentID){
      fetch(`http://${environment['BASE_URL']}/api/v1/comments/${commentID}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
           Accept: 'application/json',
           Authorization: `Bearer ${key}`
        },
      }).then(r=>r.json()).then(data=>console.log(data))
    }

    this.setState({comments: this.state.comments.filter(oneComment => {
      return oneComment.id !== comment.id
    })})
  }

  postButtonHandler = () =>{

    deviceStorage.loadJWT('jwt')
    .then(key => fetchToCommentOnSpot(key))


    const fetchToCommentOnSpot = (key) =>{
      fetch(`http://${environment['BASE_URL']}/api/v1/comments`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Accept: 'application/json',
           Authorization: `Bearer ${key}`
        },
        body: JSON.stringify({
          'content': this.state.commentContent,
          'skate_spot_id': this.state.skatespot.id,
          'user_id': this.props.user.user.id
        })
      })
      .then(r=>r.json())
      .then((data)=>this.setState({comments: [...this.state.comments, data]}))
    }

  }

  render(){
    console.log('2nd: ', this.state);
    return(
      <View>
        <Header
          leftComponent={{ icon: 'menu' , color: 'black', onPress: () => this.props.navigation.openDrawer()}}
          centerComponent={{ fontFamily:'Lobster', text: `${this.state.skatespot.name}`, style: { color: 'black', fontSize: wp('6%') } }}
          backgroundColor='white'
          containerStyle={{
             fontFamily:'Lobster',
             justifyContent: 'space-around',
           }}/>

           <Icon
           raised
           size={hp('2.8')}
           name='directions'
           iconStyle={{color:"rgb(244, 2, 87)"}}
           containerStyle={{position:'absolute',zIndex:1, marginLeft:wp('85%'), marginTop:('20%')}}
           onPress={() => Linking.openURL(`https://www.google.com/maps/dir//${this.state.skatespot.latitude},${this.state.skatespot.longitude}`)}
           title='Directions' />

          <Card
            containerStyle={styles.cardContainer}
            image={{uri:`http://${environment['BASE_URL']}${this.state.imageURL}`}}
            imageStyle={styles.cardImage}
            >
            <Text style={{marginBottom: 10, position:'absolute', marginTop: 10, marginLeft: 10}}>
              {this.state.skatespot.url}
              {this.state.skatespot.description}{"\n"}
              Posted by {this.state.skatespot.user
                          ?this.state.skatespot.user.username
                          :null
                        }

            </Text>


              <Divider style={styles.divider} />

              <ScrollView
                snapToEnd
                style={styles.commentContainer}>
                  {this.state.comments.map(comment=>{
                  return <View style={styles.oneCommentContainer}>
                          <Text style={{fontWeight: 'bold'}}>{this.props.user.user.username} </Text>

                            <Text style={styles.commentContent}>{comment.content}</Text>
                            <View>
                              {comment.user_id === this.props.user.user.id
                              ? <Icon name='trash' type='font-awesome' containerStyle={styles.trashIcon} onPress={() => this.deleteComment(comment)}/>
                              : null}
                            </View>
                         </View>
                      })}
              </ScrollView>

              <View style={styles.commentInputandButtonContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder='Comment'
                  onChangeText={(value) => this.onCommentChange(value)}
                  />

                {this.state.commentContent
                ? <Button
                title='Post'
                buttonStyle={styles.postButton}
                onPress={this.postButtonHandler}
                />
                : <Button
                disabled
                title='Post'
                buttonStyle={styles.postButton}
                />}
            </View>
          </Card>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const connectMap = connect(mapStateToProps)

export default withNavigation(compose(connectMap)(SpotPage))
