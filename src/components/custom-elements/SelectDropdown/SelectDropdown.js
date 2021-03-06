import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import styles from './SelectDropdown.module.scss';

class SelectDropdown extends Component {
   constructor(props) {
      super(props);

      this.state = {
         open: false
      };

      this.dropdownRef = React.createRef();
      this.handleSelect = this.handleSelect.bind(this);
   }

   componentDidMount() {
      if (!this.props.options || !this.props.options.length) {
         return;
      }

      this.toggleButton = this.dropdownRef.current.querySelector('button');
      let value = this.props.options[0].value;
      let label = this.props.options[0].label;

      if (this.props.value) {
         const option = this.props.options.find(option => option.value === this.props.value);

         if (option) {
            value = option.value;
            label = this.props.optionValueAsLabel ? option.value : option.label;
         }
      }

      this.toggleButton.setAttribute('data-label', label);
      this.toggleButton.setAttribute('data-value', value);
      this.toggleButton.innerText = label;
   }

   handleSelect(_, event) {
      const element = event.currentTarget;
      const value = element.getAttribute('data-value');
      const label = element.getAttribute('data-label');

      this.toggleButton.setAttribute('data-value', value);
      this.toggleButton.innerText = element.innerText;

      if (value !== this.props.value) {
         this.setState({ currentValue: value });
         this.props.onSelect({ name: this.props.name, label, value });
      }
   }

   render() {
      return (
         <DropdownButton
            id="dropdown-basic-button"
            name={this.props.name}
            title={this.props.options && this.props.options[0] && this.props.options[0].label ? this.props.options[0].label : ''}
            onSelect={this.handleSelect}
            ref={this.dropdownRef}
            className={`${styles.dropdown} ${this.props.className ? this.props.className : ''}`}
         >
            {
               this.props.options && this.props.options.length ? this.props.options.map(option => {
                  return <Dropdown.Item as="span" key={option.value.toString()} data-value={option.value} data-label={option.label}>{this.props.optionValueAsLabel ? option.value : option.label}</Dropdown.Item>
               }) : ''
            }
         </DropdownButton>
      );
   }
}

SelectDropdown.propTypes = {
   name: PropTypes.string.isRequired,
   value: PropTypes.any.isRequired,
   options: PropTypes.array.isRequired,
   onSelect: PropTypes.func.isRequired,
   className: PropTypes.string,
   optionValueAsLabel: PropTypes.bool
};

export default SelectDropdown
