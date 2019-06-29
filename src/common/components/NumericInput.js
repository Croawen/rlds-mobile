import React from "react";
import { TextInput } from "react-native-paper";

const numbers = "0123456789";
class NumericInput extends React.PureComponent {
  render() {
    return (
      <TextInput
        mode="outlined"
        label={this.props.label}
        value={this.props.value.toString()}
        onChangeText={text => {
          let newText = "";

          for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
              newText = newText + text[i];
            }
          }

          const num = parseInt(newText, 10);
          this.props.onChange(isNaN(num) ? 0 : num);
        }}
      />
    );
  }
}

export default NumericInput;
