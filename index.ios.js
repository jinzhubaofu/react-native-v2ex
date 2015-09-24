/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight
} = React;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      isLoading: true
    };
    this.fetch = this.fetch.bind(this);
    this.onPress = this.onPress.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    fetch('https://www.v2ex.com/api/topics/hot.json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          isLoading: false
        });
      });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text style={{textAlign: 'center'}}>加载中...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.logoWrap}>
          <Image
            style={styles.logo}
            source={{uri: 'https://cdn.v2ex.co/site/logo@2x.png?m=1346064962'}} />
        </View>
        <ListView
          style={{flex: 2}}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} />
      </View>
    );
  }

  renderRow(row, index) {

    var uri = 'http:' + row.member.avatar_normal;
    var title = row.title;

    return (
      <TouchableHighlight
        key={row.id}
        onPress={this.onPress}>
        <View style={styles.row}>
          <Image
            style={styles.image}
            source={{uri: uri}} />
          <Text style={styles.text} numberOfLines={3}>{title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  onPress(e) {
    console.log(e);
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    flexWrap: 'nowrap'
  },

  logoWrap: {
    flex: 0,
    alignItems: 'center',
    marginTop: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor: '#dddddd'
  },

  logo: {
    flex: 1,
    width: 200,
    height: 50
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2'
  },
  image: {
    flex: 0,
    width: 50,
    height: 50,
    marginRight: 10
  },
  text: {
    flex: 2
  }
});

AppRegistry.registerComponent('v2ex', () => App);
