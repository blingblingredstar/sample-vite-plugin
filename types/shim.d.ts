declare module 'virtual:*' {
  export default any;
}

declare module '*.svg' {
  export { ReactComponent };
  export default string;
}
