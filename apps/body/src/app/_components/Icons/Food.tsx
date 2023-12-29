import { FC } from 'react';
import { IconProps } from './IconProps';

export const Food: FC<IconProps> = (props) => {
    return (
        <svg
            {...props}
            width="50"
            height="50"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M39.2431 2.37978C39.9153 2.9507 39.9974 3.95846 39.4265 4.63067L31.7445 13.6754L31.7424 13.6779L31.7318 13.6905L31.6862 13.7453C31.6457 13.7943 31.5862 13.867 31.5136 13.9577C31.3675 14.1402 31.173 14.3903 30.9752 14.6644C30.7748 14.9422 30.586 15.2243 30.4429 15.4736C30.3199 15.688 30.2735 15.8053 30.2605 15.8383C30.2578 15.8452 30.2565 15.8485 30.2563 15.8479L30.2569 15.844C30.1433 16.4135 30.2113 16.7761 30.2644 16.9527C30.2713 16.9755 30.2781 16.9961 30.2847 17.0143L31.3938 17.9562C31.4568 17.7815 31.5517 17.615 31.6789 17.4651L40.1728 7.46442C40.7437 6.79221 41.7515 6.7101 42.4237 7.28103C43.0959 7.85195 43.178 8.8597 42.6071 9.53191L34.1132 19.5326C33.9859 19.6825 33.8369 19.803 33.6748 19.8935L34.8663 20.9055C34.8853 20.909 34.9067 20.9125 34.9304 20.9156C35.1132 20.9394 35.4821 20.9478 36.0257 20.7435C36.0211 20.7452 36.0205 20.7452 36.024 20.7431L36.0307 20.739C36.0611 20.7208 36.1695 20.6561 36.361 20.5C36.5839 20.3185 36.8317 20.0865 37.0734 19.8437C37.3119 19.6042 37.5272 19.3717 37.6837 19.1981C37.7614 19.1117 37.8235 19.0413 37.8653 18.9933L37.912 18.9394L37.9227 18.927L37.9243 18.925L45.6067 9.8797C46.1776 9.2075 47.1854 9.12539 47.8576 9.69631C48.5298 10.2672 48.6119 11.275 48.041 11.9472L40.3586 20.9925L39.4164 20.1923C40.3586 20.9925 40.3587 20.9924 40.3586 20.9925L40.3559 20.9957L40.3508 21.0016L40.3336 21.0217L40.2727 21.0921C40.2209 21.1514 40.1473 21.235 40.0565 21.3358C39.8759 21.5362 39.623 21.8096 39.3365 22.0973C39.0532 22.3818 38.7192 22.6984 38.3781 22.9762C38.0683 23.2286 37.6298 23.5525 37.1495 23.733C36.1009 24.1272 35.2032 24.172 34.5174 24.0826C34.1795 24.0385 33.9031 23.9632 33.6945 23.8896C33.5903 23.8528 33.5029 23.8163 33.433 23.7843C33.398 23.7683 33.3674 23.7534 33.3411 23.74L33.3182 23.7281L33.305 23.7212L33.2894 23.7128L33.2822 23.7088L33.2788 23.7069L33.2771 23.706C33.2763 23.7055 33.2755 23.7051 34.0543 22.311L33.2755 23.7051L33.1394 23.629L30.5121 21.3976L30.508 21.3942L27.8767 19.1593L27.7796 19.0373L29.0292 18.043C27.7796 19.0373 27.779 19.0366 27.7784 19.0358L27.7772 19.0343L27.7748 19.0312L27.7698 19.0248L27.7589 19.0108L27.7469 18.9949L27.7345 18.9782C27.7171 18.9544 27.6974 18.9266 27.6759 18.8947C27.633 18.8309 27.5829 18.7505 27.5297 18.6536C27.4232 18.4597 27.3042 18.1992 27.206 17.8728C27.0068 17.2106 26.9057 16.3175 27.1249 15.2189C27.2253 14.7157 27.4739 14.2306 27.6728 13.884C27.8918 13.5024 28.1501 13.1216 28.385 12.796C28.6225 12.4667 28.8514 12.1728 29.0199 11.9622C29.1047 11.8563 29.1752 11.7701 29.2255 11.7094L29.285 11.6379L29.302 11.6177L29.3071 11.6116L29.3096 11.6087C29.3097 11.6086 29.3098 11.6085 30.252 12.4087L29.3096 11.6087L36.9922 2.56318C37.5631 1.89097 38.5709 1.80886 39.2431 2.37978Z" />
            <path d="M29.3043 22.375C28.8285 21.9709 28.1152 22.0291 27.7111 22.5048L23.9925 26.8831L23.156 25.881C22.7559 25.4018 22.0432 25.3376 21.564 25.7377L20.3572 26.7451C19.878 27.1452 19.8138 27.8579 20.2138 28.3371L21.4748 29.8475L9.3525 44.1204C8.94842 44.5962 9.00654 45.3094 9.48231 45.7135L10.6805 46.7312C11.1563 47.1353 11.8696 47.0772 12.2736 46.6014L23.9673 32.8333L35.2372 46.3334C35.6372 46.8126 36.3499 46.8767 36.8291 46.4767L38.0359 45.4692C38.5151 45.0692 38.5793 44.3565 38.1793 43.8773L26.485 29.8688L30.6323 24.9858C31.0364 24.51 30.9782 23.7968 30.5025 23.3927L29.3043 22.375Z" />
            <path d="M2.00993 4.08193C2.0695 4.54823 2.14369 5.00481 2.23591 5.40388C3.00642 8.73813 3.87899 10.3623 6.21456 13.1601L16.9998 26.0796C17.3999 26.5588 18.1079 26.6174 18.5871 26.2174L20.2843 24.8006C20.7635 24.4005 20.8276 23.6878 20.4276 23.2086L3.84292 3.34198C3.15794 2.52144 1.87448 3.02168 2.00993 4.08193Z" />
        </svg>
    );
};
