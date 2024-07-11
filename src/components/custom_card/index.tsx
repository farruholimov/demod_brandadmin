import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Box, styled, Paper, Avatar } from '@mui/material';
import Image from 'next/image';
import SimpleTypography from '../typography';
import Link from 'next/link';
import { ThemeProps } from '../../types/theme';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGES_BASE_URL } from '../../utils/env_vars';

type InputProps = {
  item?: object,
};

const CustomBoxWrapper = styled(Box)(
  ({ theme }) =>
    `
      img {
        margin: 0;
        padding: 12px;
        margin-bottom: 4px;
        objec-fit:cover;
      }
    `
);
type CustomCardProps = {
  type?: any,
  padding?: number,
  model?: any,
  link?: any,
  imgHeight?: any,
  tagText?: string,
  tagIcon?: string,
  withAuthor?: boolean,
}

function CustomCard({ model, link, imgHeight, tagIcon, tagText, withAuthor, padding }: CustomCardProps) {

  const Label = styled(Paper)(({ theme }: ThemeProps) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }));

  const mainPadding = padding || 12

  return (
    <Link key={model?.id} href={link ? link : ""} style={{ margin: '0 0 15px 0', textDecoration: "none" }}>
      <Box sx={{
        height: "auto",
        width: "100%",
        border: " 1px solid #e0e0e0",
        background: "#fff",
        position: "relative",
        cursor: "pointer",
        transition: "all 0.4s ease",
        padding: `${mainPadding}px ${mainPadding}px 0 ${mainPadding}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        {
          tagText ?
            <SimpleTypography text={tagText || ""} className='card__sale' />
            : tagIcon ?
              <Box
                sx={{
                  position: 'absolute',
                  width: '24px',
                  height: '24px',
                  top: '5px',
                  right: '5px',
                  color: '#fff',
                  backgroundColor: '#7210be',
                  border: '1.5px solid #fff',
                  borderRadius: '3px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={tagIcon}
                  alt='icon'
                  width={14}
                  height={14}
                />
              </Box>
              : null
        }
        <Box>
          <LazyLoadImage
            src={model.cover ? (model?.cover?.[0]?.image_src ? `${IMAGES_BASE_URL}/${model?.cover?.[0]?.image_src}` : '') : ''}
            alt="Model"
            effect="blur"
            width={"100%"}
            height={imgHeight || `208px`}
            placeholderSrc={"/img/card-loader.jpg"}
            delayTime={500}
            objectFit={'cover'}
            style={{
              objectFit: 'cover'
            }}
          />
        </Box>
        <Label
          sx={{
            width: "100%",
            display: "flex",
            alignItems: 'center',
            justifyContent: "space-between",
            padding: "10px 0"
          }}
        >
          {
            withAuthor
              ? <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Image
                  src={model?.author?.image_src ? `${IMAGES_BASE_URL}/${model?.author?.image_src}` : '/img/avatar.png'}
                  alt='avatar'
                  width={28}
                  height={28}
                  style={{
                    borderRadius: '50%'
                  }}
                />
                <SimpleTypography
                  sx={{ marginLeft: '8px', display: 'flex', alignItems: 'center', textAlign: 'left' }}
                  text={model?.author?.username}
                  className='card__title'
                />
              </Box>
              :
              <SimpleTypography
                text={model?.name}
                className='card__title'
              />
          }
          {
            model?.brand && model?.brand?.name
              ? <SimpleTypography
                text={`${model?.brand?.name}`}
                className='card__title-brand'
              />
              : null
          }
        </Label>
      </Box>
    </Link>
  )
}



export default CustomCard