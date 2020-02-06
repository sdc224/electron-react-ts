import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ShareIcon from '@material-ui/icons/Share';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo';

const CloneIcon = () => <FileCopyIcon />;

const ForkIcon = () => (
  <ShareIcon />
  // <SvgIcon>
  //   <path
  //     fill="#000000"
  //     fillRule="evenodd"
  //     d="M5,4.73244 C5.5978,4.38663 6,3.74028 6,3 C6,1.89543 5.10457,1 4,1 C2.89543,1 2,1.89543 2,3 C2,3.74028 2.4022,4.38663 3,4.73244 L3,4.93845 C3,6.6089 4.13688,8.065 5.75746,8.47014 C6.48771,8.6527 7,9.30883 7,10.0616 L7,11.2676 C6.4022,11.6134 6,12.2597 6,13 C6,14.1046 6.89543,15 8,15 C9.10457,15 10,14.1046 10,13 C10,12.2597 9.5978,11.6134 9,11.2676 L9,10.0616 C9,9.30883 9.51229,8.6527 10.2425,8.47014 C11.8631,8.065 13,6.6089 13,4.93845 L13,4.73244 C13.5978,4.38663 14,3.74028 14,3 C14,1.89543 13.1046,1 12,1 C10.8954,1 10,1.89543 10,3 C10,3.74028 10.4022,4.38663 11,4.73244 L11,4.93845 C11,5.69117 10.4877,6.3473 9.75746,6.52986 C9.067,6.70247 8.46434,7.06587 8,7.55533 C7.53566,7.06587 6.933,6.70247 6.24254,6.52986 C5.51229,6.3473 5,5.69117 5,4.93845 L5,4.73244 Z"
  //   />
  // </SvgIcon>
);

const UpdateIcon = () => <SystemUpdateAltIcon />;

const CreateMRIcon = () => <MergeTypeIcon />;

const FeatureBranchIcon = () => <FeaturedVideoIcon />;

export { CloneIcon, ForkIcon, UpdateIcon, CreateMRIcon, FeaturedVideoIcon };
