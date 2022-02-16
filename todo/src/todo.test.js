import React from 'react';
import TodoList from './TodoList';
import { render, cleanup} from '@testing-library/react';
import { expect, } from '@jest/globals'

afterEach(cleanup);

  it('testing text in buttons', () => {
    const { getByTestId } = render(<TodoList />); 
    expect(getByTestId('prev')).toHaveTextContent("Prev")
    expect(getByTestId('next')).toHaveTextContent("Next")

   });

   it('testing call', () => {
    const component = new TodoList();
    const setStateMock = jest.fn();
    component.setState = setStateMock;
    component.updateInput();
    expect(setStateMock).toHaveBeenCalled();
   });

   it('testing states', () => {
    const component = new TodoList();
    const setStateMock = jest.fn();
    component.setState = setStateMock;
    expect(component.state.currentPage).toBe(1);
    expect(component.state.newItem).toBe('');

   });

   it('testing states', () => {
    const component = new TodoList();
    const setStateMock = jest.fn();
    component.setState = setStateMock;
    component.currentPage(1);
   });