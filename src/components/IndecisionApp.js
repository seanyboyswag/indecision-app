import React from 'react';

import Header from './Header'
import Action from './Action'
import Options from './Options'
import AddOption from './AddOption'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption : undefined
    }

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter(option => optionToRemove !== option)
        }));
    };

    handlePick = () =>  {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const selectedOption = this.state.options[randomNum];

        // alert(selectedOption);

        this.setState(() => ({ selectedOption }))
    };

    handleAddOption = (option) => {
        if (!option) {
            return "Enter valid value to add item";
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option already exists"
        }

        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));
    };

    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption : undefined }));
    };

    componentDidMount() {
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json);

            if (json) {
                this.setState(() => ({ options }));
            }
        } catch (e) {
            // Do nothing at all 
        }
    };

    componentDidUpdate(prevProps, prevState) {
        // accessible
        // prevProps, prevState 
        // this.props, this.state

        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json)
        }
    };

    componentWillUnmount() {
        // usually nothing to clean up, barely used
        console.log("Component will unmount");
    };

    render() {
        const title = "Indecision";
        const subtitle = "Put your life in the hands of a computer";

        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        )
    };
}
