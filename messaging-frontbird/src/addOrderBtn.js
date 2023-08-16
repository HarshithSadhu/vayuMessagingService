function Button() {
    const handleClick = () => {
      console.log('Button clicked!');
      // Perform additional actions or call functions here
    };
  
    return (
      <button onClick={handleClick}>Add Order</button>
    );
  }
  
  export default Button;
  