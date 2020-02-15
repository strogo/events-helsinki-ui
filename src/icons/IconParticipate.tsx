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
    <g stroke-width="1" fill-rule="evenodd">
      {/* eslint-disable-next-line max-len */}
      <path d="M18.5569079,3.34917143 C21.0128762,3.34917143 22.9453841,5.28237778 22.9453841,7.73834603 L22.9453841,7.73834603 L22.9453841,14.3222825 C22.9453841,16.8082825 21.0554794,18.7097111 18.5569079,18.7097111 L18.5569079,18.7097111 L17.4590032,18.7111079 C16.5929714,18.7111079 15.7793206,19.0470444 15.1671619,19.6567587 L15.1671619,19.6567587 L14.7159873,20.1072349 L14.2644635,19.6567587 C13.6530032,19.0470444 12.838654,18.7111079 11.9726222,18.7111079 L11.9726222,18.7111079 L10.8750667,18.7111079 L5.38868571,18.7097111 C2.89011429,18.7097111 0.999860317,16.8082825 0.999860317,14.3222825 L0.999860317,14.3222825 L0.999860317,7.73834603 C0.999860317,5.28237778 2.93236825,3.34917143 5.38868571,3.34917143 L5.38868571,3.34917143 Z M18.5569079,4.99498095 L5.38868571,4.99498095 C3.85008254,4.99498095 2.64532063,6.20009206 2.64532063,7.73834603 L2.64532063,7.73834603 L2.64532063,14.3222825 C2.64532063,15.9115206 3.79944762,17.0646 5.38868571,17.0646 L5.38868571,17.0646 L11.9726222,17.0649492 C12.9654159,17.0649492 13.9131619,17.3582825 14.7159873,17.9037429 C15.5188127,17.3582825 16.4662095,17.0649492 17.4590032,17.0649492 L17.4590032,17.0649492 L18.5555111,17.0646 C20.1457968,17.0646 21.2995746,15.9115206 21.2995746,14.3222825 L21.2995746,14.3222825 L21.2995746,7.73834603 C21.2995746,6.20009206 20.0944635,4.99498095 18.5569079,4.99498095 L18.5569079,4.99498095 Z M18.3363492,12.4006349 L18.3363492,14.0467937 L5.60812698,14.0467937 L5.60812698,12.4006349 L18.3363492,12.4006349 Z M18.3363492,8.01215873 L18.3363492,9.65831746 L5.60812698,9.65831746 L5.60812698,8.01215873 L18.3363492,8.01215873 Z" />
    </g>
  </svg>
);
