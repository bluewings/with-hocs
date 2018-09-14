# with-hocs


```jsx
function Sample(props) {
  return <h1>HELLO {props.capitalized}!</h1>;
}

// pass high-order components via hocs props
const Enhance = withHOCs({ importAs: 'hocs' })(Sample);

...

const hocs = [
  defaultProps({
    name: 'World',
  }),

  withPropsOnChange(['name'], ({ name }) => ({
    capitalized: name.toUpperCase(),
  })),
];

// <Enhance hocs={hocs} name="sydney" /> → HELLO SYDNEY!

```
