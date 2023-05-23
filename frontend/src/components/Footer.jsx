import React from "react";

export default function Footer() {
  return (
    // <!-- Footer -->
    <footer className="text-center text-lg-start bg-dark text-white mt-5">
      {/* <!-- Section: Links  --> */}
      <section className="">
        <div className="container text-center text-md-start mt-5">
          {/* <!-- Grid row --> */}
          <div className="row mt-3">
            {/* <!-- Grid column --> */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 text-center">
              {/* <!-- Content --> */}
              <h6 className="text-uppercase fw-bold mb-4">Social</h6>
              <p>Check my work</p>
              <div>
                <a
                  href="https://www.linkedin.com/in/negru-dan/"
                  className="btn btn-dark btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a
                  href="https://github.com/negrudan"
                  className="btn btn-dark btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
            {/* <!-- Grid column --> */}

            {/* <!-- Grid column --> */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* <!-- Links --> */}
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-envelope me-3 text-secondary mb-2"></i>
                dan.negru2002@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-3 text-secondary"></i> (+40) 0773
                307 342
              </p>
            </div>
            {/* <!-- Grid column --> */}
          </div>
          {/* <!-- Grid row --> */}
        </div>
      </section>
      {/* <!-- Section: Links  --> */}

      {/* <!-- Copyright --> */}
      <div className="text-center p-4 footer">
        ©2023 Copyright:&nbsp;
        <a
          className="text-reset fw-bold"
          href="#!"
          target="_blank"
          rel="noopener noreferrer"
        >
          MY PORTFOLIO
        </a>
      </div>
      {/* <!-- Copyright --> */}
    </footer>
    // <!-- Footer -->
  );
}
