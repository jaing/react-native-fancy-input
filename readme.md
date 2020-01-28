#React Native Fancy Input
I present you a simple input component that is fancy, easy to use and super flexible. 

## Features
* Super easy styling
* Material like behaviour
* Flexible

## Installation

    yarn add react-native-fancy-input
    
or

    npm intsall react-native-fancy-input
    
## Usage
This input is a controlled component so your parent component needs to maintain a state.

### Basic

```javascript
import FancyInput from 'react-native-fancy-input';
```

And inside a component

```javascript
class InputWrapper extends React.Component {
    state = {
        value: this.props.value || '',
    };

    render() {
        return (
            <View style={{ width: '100%' }}>
                <FancyInput
                    onChange={this.onChange}
                    value={this.state.value}
                />
            </View>
        );
    }

    onChange = value => {
        this.setState({
            value,
        });
    };
}
```

### Configuration props
List of props supported by a component

Prop       | Type    | Default    | Description
---------- | ------- | ---------- | -----------------------
backgroundColor | string | #ffffff | Input background color
defaultPadding | number | 8 | Default padding for input
error | string |  | Error message displayed under an input
errorColor | string | #ac0000 | Color for an error message background
errorTextColor | string | #fff | Color for an error message text
isLoading | bool | | Display loading indicator
itemPrepend | node | | Prepend React Node before input
itemAppend | node | | Append React Node after input
label | string | | Label for input
placeholder | string | | Placeholder text
primaryColor | string | #222222 | Primary color. Based on it it will generate whole styling.
readOnly | bool | | Make input read only.
readOnlyColor | string | #ececec | Background color for read only field
stylesContainer | object | {} | Extra styles for a container
stylesError | object | {} | Extra styles for an error
stylesErrorText | object | {} |  Extra styles for an error text
stylesInput | object | {} | Extra styles for an input
stylesLabel | object | {} |  Extra styles for a label
stylesLoading | object | {} |  Extra styles for a loading
textInputProps | object | {} |  Same props as [<TextInput/>](https://facebook.github.io/react-native/docs/textinput.html)
value | string | | String value
onBlur | func | | on blur callback
onChange | func | | on change callback
onFocus | func | | on focus callback

### Examples

#### Different styling
```javascript
<FancyInput
    label="Some label"
    primaryColor="#005cc5"
    value={''}
/>
```

#### Disabled and loading
```javascript
<FancyInput
    label="Some label"
    isLoading
    readOnly
    value={''}
/>
```

#### With prepend
```javascript
<FancyInput
    label="Some label"
    itemPrepend={
        <View style={
            { padding: 10, backgroundColor: '#dedede', alignItems: 'center' }
        }>
            <Text style={{ lineHeight: 30, fontWeight: '700' }}>http://</Text>
        </View>
    }
    value={''}
/>
```

#### With append icon
```javascript
<FancyInput
    label="Some label"
    itemAppend={
        <View style={
            { padding: 10, width: 50, backgroundColor: '#de9510', alignItems: 'center' }
        }>
            <Foundation color="#fff" name="dollar" size={32} />
        </View>
    }
    value={''}
/>
```
