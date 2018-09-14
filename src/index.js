import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { List as ImmutableList } from 'immutable';
import memoizeOne from 'memoize-one';

export default (options = {}) => {
  const { importAs = 'hocs' } = options;

  return BaseComponent => {
    class WithCompose extends PureComponent {
      constructor(props) {
        super(props);
        this._composeList = ImmutableList();
      }

      composeList = memoizeOne(composeArray => {
        const _composeArray = (Array.isArray(composeArray)
          ? composeArray
          : [composeArray]
        ).filter(e => typeof e === 'function');
        if (this._composeList.size !== _composeArray.length) {
          this._composeList = ImmutableList(_composeArray);
        } else {
          this._composeList = _composeArray.reduce(
            (prev, curr, index) => prev.set(index, curr),
            this._composeList
          );
        }
        return this._composeList;
      });

      enhance = memoizeOne(
        composeList =>
          composeList.size === 0
            ? BaseComponent
            : compose(...composeList.toJS())(BaseComponent)
      );

      render() {
        // If a new array of the same contents comes in, it should be skipped.
        const composeList = this.composeList(this.props[importAs]);
        const Enhanced = this.enhance(composeList);
        return <Enhanced {...this.props} />;
      }
    }

    return WithCompose;
  };
};
