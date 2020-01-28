import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Text, Animated, StyleSheet, View, ActivityIndicator } from 'react-native';
import pSBC from 'shade-blend-color';


class FancyInput extends Component  {

    state = {
        isActive: false,
        currentLabelPosition: new Animated.ValueXY({
            x: Number(this.props.defaultPadding),
            y: Number((!!this.props.value || !!this.props.placeholder) ? 6 : 16),
        }),
        currentBorderColor: new Animated.Value(0),
    };

    render() {
        const { label, error, value } = this.props;
        const { currentLabelPosition } = this.state;

        return (
            <Animated.View style={this.getContainerStyles()}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    {!!this.props.itemPrepend ? this.props.itemPrepend : null}
                    <View style={{ flexGrow: 1 }}>
                        {!!label && (
                            <Animated.Text style={[this.getLabelStyles(), currentLabelPosition.getLayout()]}>
                                {label}
                            </Animated.Text>
                        )}
                        <TextInput
                            {...this.props.textInputProps}
                            style={this.getInputStyles()}
                            onChangeText={this.onInputChange}
                            onBlur={this.onBlur}
                            onFocus={this.onFocus}
                            value={value}
                            placeholder={this.props.placeholder}
                            editable={!this.props.readOnly}
                        />
                        {this.props.isLoading && (
                            <ActivityIndicator
                                color={this.props.primaryColor}
                                size="small"
                                style={this.getLoadingStyles()}
                            />
                        )}
                    </View>
                    {!!this.props.itemAppend ? this.props.itemAppend : null}
                </View>

                {!!error && (
                    <View style={this.getErrorStyles()}>
                        <Text style={this.getErrorTextStyles()}>{error}</Text>
                    </View>
                )}
            </Animated.View>
        );
    }

    getLoadingStyles = () => {
        return {
            ...styles.loadingStyles,
            ...this.props.stylesLoading,
            ...{
                right: this.props.defaultPadding,
            },
        };
    };

    getErrorStyles = () => {
        return {
            ...styles.errorStyles,
            ...{
                backgroundColor: this.props.errorColor,
                paddingLeft: this.props.defaultPadding,
                paddingRight: this.props.defaultPadding,
            },
        };
    };

    getErrorTextStyles = () => {
        return {
            ...styles.errorTextStyles,
            color: this.props.errorTextColor,
        };
    };

    getInputStyles = () => {
        const defaultInputStyles = {
            ...styles.inputStyles,
            ...this.props.stylesInput,
            ...{
                color: this.props.primaryColor,
            },
            ...{
                paddingLeft: this.props.defaultPadding,
                paddingRight: this.props.defaultPadding,
            },
        };

        if (this.state.isActive || !!this.props.value || !!this.props.placeholder) {
            return {
                ...defaultInputStyles,
                ...styles.inputActiveStyles,
            };
        }

        return defaultInputStyles;
    };

    getLabelStyles = () => {
        const defaultInputStyles = {
            ...styles.labelStyles,
            ...this.props.stylesLabel,
            ...{
                color: this.props.primaryColor,
            },
            ...{
                left: this.props.defaultPadding,
            },
            ...(!!this.props.error
                ? {
                    color: this.props.errorColor,
                }
                : {}),
        };
        if (this.state.isActive || !!this.props.value || !!this.props.placeholder) {
            return {
                ...defaultInputStyles,
                ...styles.labelActiveStyles,
            };
        }

        return defaultInputStyles;
    };

    getContainerStyles = () => {
        const borderColorStyles = this.state.currentBorderColor.interpolate({
            inputRange: [0, 1],
            outputRange: [pSBC(0.8, this.props.primaryColor), this.props.primaryColor],
        });

        return {
            ...styles.container,
            ...{
                backgroundColor: this.props.backgroundColor,
            },
            ...this.props.stylesContainer,
            ...{
                borderColor: borderColorStyles,
            },
            ...(!!this.props.error
                ? {
                    borderColor: this.props.errorColor,
                }
                : {}),
            ...(this.props.readOnly
                ? {
                    backgroundColor: this.props.readOnlyColor,
                    opacity: 0.7,
                }
                : {}),
        };
    };

    onBlur = event => {
        this.setState(
            {
                isActive: false,
            },
            () => {
                Animated.parallel([
                    Animated.timing(this.state.currentBorderColor, {
                        duration: 400,
                        toValue: 0,
                    }),
                    ...(!this.props.value && !this.props.placeholder
                        ? [
                            Animated.spring(this.state.currentLabelPosition, {
                                toValue: {
                                    x: Number(this.props.defaultPadding),
                                    y: 16,
                                },
                            }),
                        ]
                        : []),
                ]).start();

                this.props.onBlur && this.props.onBlur(event);
            },
        );
    };

    onFocus = () => {
        this.setState(
            {
                isActive: true,
            },
            () => {
                Animated.parallel([
                    Animated.timing(this.state.currentBorderColor, {
                        duration: 400,
                        toValue: 1,
                    }),
                    Animated.spring(this.state.currentLabelPosition, {
                        toValue: {
                            x: Number(this.props.defaultPadding),
                            y: 6,
                        },
                    }),
                ]).start();

                this.props.onFocus && this.props.onFocus(event);
            },
        );
    };

    onInputChange = value => {
        this.props.onChange && this.props.onChange(value);
    };
}

FancyInput.propTypes = {
    backgroundColor: PropTypes.string,
    defaultPadding: PropTypes.number,
    error: PropTypes.string,
    errorColor: PropTypes.string,
    errorTextColor: PropTypes.string,
    isLoading: PropTypes.bool,
    itemPrepend: PropTypes.node,
    itemAppend: PropTypes.node,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    primaryColor: PropTypes.string,
    readOnly: PropTypes.bool,
    readOnlyColor: PropTypes.string,
    stylesContainer: PropTypes.object,
    stylesError: PropTypes.object,
    stylesErrorText: PropTypes.object,
    stylesInput: PropTypes.object,
    stylesLabel: PropTypes.object,
    stylesLoading: PropTypes.object,
    textInputProps: PropTypes.object,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
};

FancyInput.defaultProps = {
    backgroundColor: '#ffffff',
    defaultPadding: 8,
    errorColor: '#ac0000',
    errorTextColor: '#fff',
    primaryColor: '#222222',
    readOnlyColor: '#ececec',
    stylesContainer: {},
    stylesError: {},
    stylesErrorText: {},
    stylesInput: {},
    stylesLabel: {},
    stylesLoading: {},
    textInputProps: {},
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderStyle: 'solid',
        textAlign: 'left',
        display: 'flex',
        width: '100%',
    },
    loadingStyles: {
        top: 16,
        position: 'absolute',
    },
    errorStyles: {
        textAlign: 'left',
        display: 'flex',
        width: '100%',
        padding: 5,
    },
    errorTextStyles: {
        fontWeight: '700',
    },
    labelStyles: {
        fontSize: 16,
        position: 'absolute',
    },
    labelActiveStyles: {
        fontSize: 12,
        fontWeight: '500',
    },
    inputStyles: {
        fontSize: 16,
        height: 54,
    },
    inputActiveStyles: {
        lineHeight: 28,
    },
});

export default FancyInput;
