// For side-effect imports (like 'globals.css')
declare module '*.css';

// For CSS Modules (like 'styles.module.css') - good to add just in case
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}