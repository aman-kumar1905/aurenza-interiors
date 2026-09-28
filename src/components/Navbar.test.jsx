import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar mobile menu', () => {
  it('closes and returns focus to the toggle when Escape is pressed while focus is inside the open menu', () => {
    render(<Navbar />)

    fireEvent.click(screen.getByLabelText('Open menu'))

    const mobileProjectsLink = screen.getAllByText('Projects')[1]
    mobileProjectsLink.focus()
    fireEvent.keyDown(mobileProjectsLink, { key: 'Escape' })

    expect(screen.queryByLabelText('Close menu')).not.toBeInTheDocument()
    expect(document.activeElement).toBe(screen.getByLabelText('Open menu'))
  })
})
