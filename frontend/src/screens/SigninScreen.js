import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function SigninScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  return (
    <div className="container small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <form>
        <div className="mb-3" controlId="email">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required />
        </div>
        <div className="mb-3" controlId="password">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" required />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </div>
        <div className="mb-3">
          New customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </form>
    </div>
  );
}
