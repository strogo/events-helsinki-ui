import React from "react";

type Props = { className?: string };

// TODO: Import this icon from HDS when it's added there
export default ({ className = "" }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    className={className}
  >
    <g strokeWidth="1" fillRule="evenodd">
      {/* eslint-disable-next-line max-len */}
      <path d="M18.06595,18.073365 C16.8588,18.073365 15.88055,17.229165 15.88055,16.187215 C15.88055,15.145615 16.8588,14.301065 18.06595,14.301065 C19.2731,14.301065 20.25135,15.145615 20.25135,16.187215 C20.25135,17.229165 19.2731,18.073365 18.06595,18.073365 M5.1765,21.362315 C3.9697,21.362315 2.9911,20.517765 2.9911,19.476165 C2.9911,18.434215 3.9697,17.590015 5.1765,17.590015 C6.38365,17.590015 7.3619,18.434215 7.3619,19.476165 C7.3619,20.517765 6.38365,21.362315 5.1765,21.362315 M21.8778,4.627415 L21.86695,2.738815 C20.8565,2.305165 19.67455,1.999965 18.19685,1.999965 C17.33935,1.999965 16.8231,2.049315 15.90085,2.275065 C15.12595,2.464765 13.6437,3.086365 12.0526,4.138815 C10.70895,5.028165 9.62675,5.712765 7.805,5.743215 L7.805,5.738315 L7.3311,5.738315 L7.3311,16.573965 C6.7284,16.227815 6.0095,16.025865 5.2374,16.025865 C3.1213,16.025865 1.4,17.538565 1.4,19.398115 C1.4,21.258015 3.1213,22.770715 5.2374,22.770715 C7.3535,22.770715 9.07515,21.258015 9.07515,19.398115 L9.07515,9.170415 C11.21575,8.876765 12.6651,7.936315 13.96885,7.088965 C15.3202,6.211165 16.3877,5.517815 18.19685,5.517815 C18.92695,5.517815 19.58285,5.666915 20.1859,5.895465 L20.1859,13.432365 C19.57515,13.072215 18.8412,12.860815 18.0523,12.860815 C15.9362,12.860815 14.2149,14.374215 14.2149,16.233415 C14.2149,18.092965 15.9362,19.606015 18.0523,19.606015 C20.1684,19.606015 21.8897,18.092965 21.8897,16.233415 L21.8897,4.621115 C21.88585,4.623215 21.88165,4.625315 21.8778,4.627415" />
    </g>
  </svg>
);
