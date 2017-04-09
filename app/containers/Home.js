import React, { Component } from 'react';
import ReactNative from 'react-native';
const {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  StyleSheet,
} = ReactNative;
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props); //calls constructor on Component
    this.state = {
      ingredientsInput: '',
      searching: false
    }
  }
  searchPressed(){
    this.setState({searching: true});
    this.props.fetchRecipes(this.state.ingredientsInput).then( () => {
      this.setState({searching: false});
    });
  }

  recipes(){
    return Object.keys(this.props.searchedRecipes).map( key => this.props.searchedRecipes[key])
  }

  render(){
    console.log(this.recipes());
    return <View style={styles.scene}>
      <View style={styles.searchSection}>
        <TextInput style={styles.searchInput}
          returnKeyType='search'
          placeholder='Ingredients (comma delimited)'
          onChangeText={(ingredientsInput) => this.setState({ingredientsInput})}
          value={this.state.ingredientsInput}
        />
        <TouchableHighlight style={styles.searchButton} onPress={ () => this.searchPressed() }>
          <Text>Fetch Recipes</Text>
        </TouchableHighlight>
      </View>
      <ScrollView style={styles.scrollSection}>
        {!this.state.searching && this.recipes().map((recipe) => {
          return <View key={recipe.id}>
            <Image source={{uri: recipe.thumbnail}} style={styles.resultImage} />
            <Text style={styles.resultText}>{recipe.title}</Text>
          </View>
        })}
        { this.state.searching ? <Text> Searching... </Text> : null}
      </ScrollView>
    </View>
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 20
  },
  searchSection: {
    height: 30,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
    flexDirection: 'row'
  },
  searchInput: {
    flex: 0.7
  },
  searchButton: {
    flex: 0.3
  },
  scrollSection: {
    flex: 0.8
  },
  resultImage: {
    height: 150
  },
  resultText: {
    backgroundColor: '#000',
    color: '#FFF',
    height: 20,
  }
})

function mapStateToProps(state){
  return {
    searchedRecipes: state.searchedRecipes
  }
}

export default connect(mapStateToProps)(Home);
