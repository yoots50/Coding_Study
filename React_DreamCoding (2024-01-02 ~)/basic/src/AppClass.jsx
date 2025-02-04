// Appclass.jsx
import React from 'react';
import Counter from './basic/components/Counter';

export default class AppClass extends React.Component { // 상속시키는 대상은 항상 React.Component
  state = { count: 0 }; // 멤버 변수에 객처로 할당

  onClick = () => {
    this.setState({ count: this.state.count + 1 }); // state안의 count를 업데이트
  };

  componentDidMount() {
    console.log('컴포넌트가 마운트 되었음!');
  }

  componentWillUnmount() {
    console.log('컴포넌트가 곧 언마운트될 예정임!');
  }

  render() {
    return (
      <div className='container'>
        <div className='banner'>
          Total Count: {this.state.count} {this.state.count > 10 ? '🔥' : '❄️'}
        </div>
        <div className='counters'>
          <Counter total={this.state.count} onClick={this.onClick} />
          <Counter total={this.state.count} onClick={this.onClick} />
        </div>
      </div>
    );
  }
}
