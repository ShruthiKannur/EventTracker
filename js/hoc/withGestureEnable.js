import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export function withGestureEnable(ComponentToWrap) {
  class WrappedComponent extends PureComponent {
    onSwipe = (gestureName, gestureState) => {
      const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
      switch(gestureName) {
        case SWIPE_LEFT:
          this.onSwipeLeft();
          break;
        case SWIPE_RIGHT:
          this.onSwipeRight();
          break;
        default:
          break;
      }
    };

    onSwipeLeft = () => {
      console.log('swiped left');
      const { navigation } = this.props;
      navigation.navigate('TrackedEvents');
    }

    onSwipeRight = () => {
      console.log('swiped right');
      const { navigation } = this.props;
      navigation.goBack();
    }

    render() {
      const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };
      return (
        <GestureRecognizer
            onSwipe={(gestureName, gestureState) => this.onSwipe(gestureName, gestureState)}
            config={config}
            style={{
              flex: 1,
            }}
          >
            <ComponentToWrap {...this.props} />
        </GestureRecognizer>
      );
    }
  }

  return WrappedComponent;
}
