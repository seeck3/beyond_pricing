import { Card, CardContent, Popover, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react'
import { Days } from '../../types/types';

type Props = {
    date?: Days
    basePrice: number
    fullDate: string
}

export const TileContent = ({date, basePrice, fullDate}: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLSpanElement | null>(null);
    const open = Boolean(anchorEl);

    const onHover = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
      };

    const onLeave = () => {
    setAnchorEl(null);
    };

    const fullPrice = React.useMemo(() => {
        return date?.factors ? (basePrice + (basePrice * date.factors.dayOfWeek ) + (basePrice * date.factors.seasonal)).toFixed() : basePrice
    },[basePrice])

  return (
    <div className='tile-content' >
        <Typography aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true" onMouseEnter={onHover} 
        onMouseLeave={onLeave}
        >${fullPrice}</Typography>
         <Popover
        open={open}
        anchorEl={anchorEl}
        sx={{
            pointerEvents: 'none',
          }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        disableRestoreFocus
      >
         <Card sx={{ minWidth: 275 }}>
            <CardContent className='popover-content-1'>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                    {fullDate}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                    {date?.isBlocked ? "Blocked" : "Not Blocked"}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.primary">
                    ${fullPrice}
                    </Typography>
            </CardContent>
            <CardContent className='popover-content-2'>
                    <div className='popover-content-left'>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                        ${basePrice}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                        + ${basePrice * (date?.factors.seasonal ? date.factors.seasonal : 0)}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                        + ${basePrice * (date?.factors.dayOfWeek ? date.factors.dayOfWeek : 0)}
                        </Typography>
                    </div>
                    <div className='popover-content-right'>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                        Base
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                        Seasonality
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                        Day of Week
                        </Typography>
                    </div>
                
            </CardContent>
            <CardContent className='popover-content-2'>
                    <div className='popover-content-left'>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                        ${fullPrice}
                        </Typography>
                    </div>
                    <div className='popover-content-right'>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" >
                        Total
                        </Typography>
                    </div>
            </CardContent>
        </Card>
      </Popover>
    </div>
  )
}
