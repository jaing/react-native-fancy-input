declare module "react-native-fancy-input" {
  import React, { Component } from "react";

  export interface FancyInputProps {
    backgroundColor?: string;
    defaultPadding?: number;
    error?: string;
    errorColor?: string;
    errorTextColor?: string;
    isLoading?: boolean;
    itemPrepend?: Component;
    itemAppend?: Component;
    label?: string;
    placeholder?: string;
    primaryColor?: string;
    readOnly?: boolean;
    readOnlyColor?: string;
    stylesContainer?: object;
    stylesError?: object;
    stylesErrorText?: object;
    stylesInput?: object;
    stylesLabel?: object;
    stylesLoading?: object;
    textInputProps?: object;
    value?: string;
    onBlur?: Function;
    onChange?: Function;
    onFocus?: Function;
  }

  export default class FancyInput extends Component<
      FancyInputProps,
    {}
  > {}
}
