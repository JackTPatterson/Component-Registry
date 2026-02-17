'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import SplitType from 'split-type'
import styles from './AnimatedButton.module.css'

type AnimatedButtonProps = {
    text: string
    variant?: 'primary' | 'secondary'
}

export const AnimatedButton = ({ text, variant = 'primary' }: AnimatedButtonProps) => {
    const textRef = useRef<HTMLParagraphElement>(null)
    const buttonRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        if (!textRef.current || !buttonRef.current) return

        gsap.registerPlugin(CustomEase)
        CustomEase.create('customEase', '0.65, 0.05, 0, 1')

        const split = new SplitType(textRef.current, {
            types: 'chars',
            tagName: 'span',
        })

        const chars = split.chars

        const enterAnim = () => {
            gsap.to(chars, {
                y: '-1.25em',
                duration: 0.4,
                stagger: 0.00666667,
                ease: 'customEase',
            })
        }

        const exitAnim = () => {
            gsap.to(chars, {
                y: '0em',
                duration: 0.3,
                stagger: 0, // 👈 no stagger on exit
                ease: 'customEase',
            })
        }

        const el = buttonRef.current
        el.addEventListener('mouseenter', enterAnim)
        el.addEventListener('mouseleave', exitAnim)

        return () => {
            el.removeEventListener('mouseenter', enterAnim)
            el.removeEventListener('mouseleave', exitAnim)
            split.revert()
        }
    }, [])

    return (
        <a
            ref={buttonRef}
            href="#"
            className={`${styles.button} ${variant === 'secondary' ? styles.secondary : ''}`}
        >
            <div className={`${styles.uClip} ${styles.uRel}`}>
                <p ref={textRef} className={styles.pReg}>
                    {text}
                </p>
            </div>
            <div className={styles.buttonBg}></div>
        </a>
    )
}
