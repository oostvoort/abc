import * as React from 'react'

import { cn } from '../../lib/utils'

interface AttributesProps {
    attack: number
    level: number
    health: number
    isOpponent?: boolean
}

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
// eslint-disable-next-line react/prop-types
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn(
            [
                'relative',
                'rounded-xs shadow-card',
                'bg-card',
                'text-card-foreground',
                'ease-in-out duration-150',
                'cursor-pointer',
                'overflow-hidden',
            ],
            className,
        )}
        {...props}
    />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
// eslint-disable-next-line react/prop-types
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props}
    />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
// eslint-disable-next-line react/prop-types
>(({className, ...props}, ref) => (
    <h3
        ref={ref}
        className={cn(
            'text-2xl font-semibold leading-none tracking-tight',
            className,
        )}
        {...props}
    />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
// eslint-disable-next-line react/prop-types
>(({className, ...props}, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
// eslint-disable-next-line react/prop-types
>(({className, ...props}, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
// eslint-disable-next-line react/prop-types
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props}
    />
))
CardFooter.displayName = 'CardFooter'

const CardImage = React.forwardRef<
    HTMLImageElement,
    React.ImgHTMLAttributes<HTMLImageElement>
    // eslint-disable-next-line react/prop-types
>(({src, alt, className, ...props}, ref) => (
    <img
        src={src}
        alt={alt}
        ref={ref}
        draggable={false}
        className={cn(['rounded-xs scale-125 origin-top', className])}
        {...props}
    />
))
CardImage.displayName = 'CardImage'

const CardAttributes = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
    // eslint-disable-next-line react/prop-types
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn(
            [
                'w-full h-[33px]',
                'absolute bottom-0',
                'rounded-b-xs',
            ],
            className,
        )}
        {...props}
    />
))
CardAttributes.displayName = 'CardAttributes'

const Attributes = ({attack, level, health, isOpponent}: AttributesProps) => {
    return (
        <div className={cn(['h-[40px]', 'relative'])}>
            <div className={'bg-brand-darkAccent absolute bottom-0 w-full h-[33px]'}/>

            {
                isOpponent
                    ?
                    <img className={'absolute top-0 left-0 max-h-[32px] h-full'}
                         src={'/assets/svg/card-attack-attribute-enemy.svg'}
                         alt={'attack-attribute-icon'}
                         draggable={false}/>
                    :
                    <img className={'absolute top-0 left-0 max-h-[32px] h-full'}
                         src={'/assets/svg/card-attack-attribute.svg'}
                         alt={'attack-attribute-icon'}
                         draggable={false}/>
            }

            {
                isOpponent
                    ?
                    <img className={'absolute top-0 right-0 max-h-[32px] h-full'}
                         src={'/assets/svg/card-health-attribute-enemy.svg'}
                         alt={'attack-attribute-icon'}
                         draggable={false}
                    />
                    :
                    <img className={'absolute top-0 right-0 max-h-[32px] h-full'}
                         src={'/assets/svg/card-health-attribute.svg'}
                         alt={'attack-attribute-icon'}
                         draggable={false}
                    />

            }

            <p className={'absolute left-3 bottom-1.5 text-20 font-noto-sans'}>{attack}</p>
            <p
                className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-14 font-noto-sans'}>{`Lvl ${level}`}</p>
            <p className={'absolute right-3.5 bottom-1.5 text-20 font-noto-sans'}>{health}</p>
        </div>
    )
}
Attributes.displayName = 'Attributes'

const EmptySlot = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
    // eslint-disable-next-line react/prop-types
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn(
            [
                'w-full min-w-[var(--card-width-min)] max-w-[var(--card-width-max)]',
                'h-full min-h-[var(--card-height-min)] max-h-[var(--card-height-max)]',
                'rounded-xs',
                'flex-center'
            ],
            className,
        )}
        {...props}
    />
))
EmptySlot.displayName = 'EmptySlot'

const ButtonEmptySlot = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
    // eslint-disable-next-line react/prop-types
>(({className, ...props}, ref) => (
    <button
        ref={ref}
        className={cn(
            [
              'w-full min-w-[var(--card-width-min)] max-w-[var(--card-width-max)]',
              'h-full min-h-[var(--card-height-min)] max-h-[var(--card-height-max)]',
                'rounded-xs',
                'flex-center',
                'bg-brand-darkAccent'
            ],
            className,
        )}
        {...props}
    />
))
ButtonEmptySlot.displayName = 'ButtonEmptySlot'

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    CardImage,
    CardAttributes,
    Attributes,
    EmptySlot,
    ButtonEmptySlot
}
