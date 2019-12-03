import React from "react";

type Props = { className?: string };

export default ({ className = "" }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M11.6234783,1 L22.8502609,5.81173913 C22.8502609,8.43126087 21.7902174,10.9868696 20.0718696,12.7033913 L20.0718696,12.7033913 L16.0298261,16.7463478 C14.3133043,18.4637826 13.2514348,20.8349565 13.2514348,23.4544783 L13.2514348,23.4544783 L2,18.6418261 C2,16.0232174 3.08652174,13.4657826 4.80304348,11.7492609 L4.80304348,11.7492609 L8.84508696,7.70813043 C10.5616087,5.99069565 11.6234783,3.61952174 11.6234783,1 L11.6234783,1 Z M13.529,4.43395652 C13.339087,5.06486957 13.0962174,5.67752174 12.8040435,6.26734783 C12.9747826,6.32669565 13.1327391,6.42165217 13.2605652,6.55130435 C13.4851739,6.77408696 13.6148261,7.08452174 13.6148261,7.40134783 C13.6148261,7.71634783 13.4851739,8.02769565 13.2605652,8.25047826 C13.0368696,8.476 12.7264348,8.60473913 12.4105217,8.60473913 C12.0964348,8.60473913 11.786,8.476 11.5632174,8.25230435 C11.2518696,8.65678261 10.9131304,9.043 10.546087,9.40913043 L10.546087,9.40913043 L6.50495652,13.4511739 C5.53621739,14.418087 4.856,15.7264783 4.56565217,17.1225217 L4.56565217,17.1225217 L11.345913,20.0223478 C11.9046957,18.1624783 12.9172609,16.4578261 14.3288261,15.0453478 L14.3288261,15.0453478 L17.9070435,11.4680435 C17.8413043,11.4251304 17.7792174,11.374913 17.7244348,11.3201304 C17.5007391,11.0955217 17.372,10.786 17.372,10.4682609 C17.372,10.1514348 17.5007391,9.84282609 17.7244348,9.61730435 C17.9490435,9.39269565 18.2585652,9.26486957 18.5753913,9.26486957 C18.8894783,9.26486957 19.199913,9.39178261 19.4226957,9.6163913 C19.8262609,8.91791304 20.1248261,8.14182609 20.290087,7.33195652 L20.290087,7.33195652 Z M14.4174826,8.3962 C14.7151348,7.80272174 15.4382652,7.56167826 16.0317435,7.86024348 C16.6261348,8.15606957 16.8653522,8.8792 16.568613,9.4735913 C16.356787,9.89541739 15.9340478,10.1364609 15.4930478,10.1364609 C15.3113522,10.1364609 15.1269174,10.0972 14.9534391,10.0104609 C14.3608739,9.71189565 14.1198304,8.98876522 14.4174826,8.3962 Z" />
  </svg>
);
