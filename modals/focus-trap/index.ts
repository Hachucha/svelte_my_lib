let stack: HTMLElement[] = []

/** Traps focus within a wrapper element */
function trapFocus(wrap: HTMLElement, active = true) {
    // true if tabbing backwards with shift + tab
    let shiftTab = false

    // set shiftTab to true if shift + tab is pressed
    const shiftTabListener = (e: KeyboardEvent) => {
        shiftTab = e.shiftKey && e.key === 'Tab'
    }
    document.addEventListener('keydown', shiftTabListener)

    // return the first and last focusable children
    function getFirstAndLastFocusable() {
        const els = [...wrap.querySelectorAll('*')].filter(
            (element: HTMLElement) => element.tabIndex >= 0
        )
        return [els[0] ?? wrap, els.slice(-1)[0] ?? wrap] as HTMLElement[]
    }

    // store document.activeElement to restore focus when untrapped
    let lastActiveElement: HTMLElement

    /** activates trap (adds to stack) and focuses inside */
    function addToStack() {
        stack.push(wrap)
        lastActiveElement = document.activeElement as HTMLElement
        getFirstAndLastFocusable()[0].focus()
    }
    /** deactivates trap (removes from stack) and restores focus to lastActiveElement */
    function removeFromStack() {
        stack = stack.filter((el) => el !== wrap)
        lastActiveElement.focus()
    }

    // add to stack if active
    if (active) {
        addToStack()
    }

    /** true if element is in the trap most recently added to stack */
    const inCurrentTrap = (el: HTMLElement) => stack.slice(-1)[0]?.contains(el)

    /** loop focus if leaving first of last focusable element in wrap */
    const focusOutListener = (e: FocusEvent) => {
        if (inCurrentTrap(wrap)) {
            const [firstFocusableEl, lastFocusableEl] = getFirstAndLastFocusable()
            if (e.target === firstFocusableEl && shiftTab) {
                lastFocusableEl.focus()
            } else if (e.target === lastFocusableEl && !shiftTab) {
                firstFocusableEl.focus()
            }
        }
    }
    wrap.addEventListener('focusout', focusOutListener)

    /** moves focus back to wrap if something outside the wrap is focused */
    const focusListener = (e: FocusEvent) => {
        if (inCurrentTrap(wrap) && !inCurrentTrap(e.target as HTMLElement)) {
            const [first, last] = getFirstAndLastFocusable()
            const focusEl = shiftTab ? last : first
            focusEl.focus()
        }
    }
    document.addEventListener('focusin', focusListener)

    return {
        /** Enables / disables trap */
        update(active: boolean) {
            if (active) {
                addToStack()
            } else {
                removeFromStack()
            }
        },
        /** Destroys trap and removes event listeners */
        destroy() {
            document.removeEventListener('keydown', shiftTabListener)
            wrap.removeEventListener('focusout', focusOutListener)
            document.removeEventListener('focusin', focusListener)
            removeFromStack()
        },
    }
}

export { trapFocus }