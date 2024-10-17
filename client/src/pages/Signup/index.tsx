const Signup = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
