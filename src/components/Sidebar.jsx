import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next'

import { BsSpeedometer2 } from 'react-icons/bs'
import { AiOutlineHome, AiOutlineMinusCircle } from 'react-icons/ai'
import { BiAddToQueue } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'

// import logo from '../img/note.svg'
import styled from 'styled-components'

const Divider = styled.hr`
  color: white;
  width: 100%;
`

export default function Sidebar() {
  const { t } = useTranslation()
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  })
  return (
    <Navbar
      bg="violet"
      variant="dark"
      style={{ width: '100%', height: isMobile ? 'auto' : '100vh' }}
      className="flex-column flex-shrink-0 p-3"
    >
      <Navbar.Brand
        as={Link}
        to="/"
        className="me-auto"
      >
        {/* <img
          src={logo}
          width="40px"
          height="40px"
          className="me-2"
          alt={t('app.logo')}
        /> */}
        <span className="fs-4">{t('app.title')}</span>
      </Navbar.Brand>
      <Divider />

      <Nav
        className="flex-column mb-auto"
        defaultActiveKey="/"
        variant="pills"
        style={{ width: '100%' }}
      >
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/"
            eventKey="/"
            className="text-light px-3"
          >
            <AiOutlineHome
              className="me-2"
              size="16"
            />
            {t('app.menu.main')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/incomes"
            eventKey="/incomes"
            className="text-light px-3"
          >
            <BsSpeedometer2
              className="me-2"
              size="16"
            />
            {t('app.menu.incomes')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/expenses"
            eventKey="/expenses"
            className="text-light px-3"
          >
            <AiOutlineMinusCircle
              className="me-2"
              size="16"
            />
            {t('app.menu.expenses')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/statistics"
            eventKey="/statistics"
            className="text-light px-3"
          >
            {/* <AiOutlineMinusCircle
              className="me-2"
              size="16"
            /> */}
          Статистика
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/create"
            eventKey="/create"
            className="text-light px-3"
          >
            <BiAddToQueue
              className="me-2"
              size="16"
            />
            {t('app.menu.create')}
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Divider />

      <NavDropdown
        title={
          <>
            <CgProfile
              className="me-2"
              size="32"
            />
            <strong>{t('app.menu.guest')}</strong>
          </>
        }
        className="text-light"
        style={{ width: '100%' }}
        drop="up"
        menuVariant="dark"
      >
        <NavDropdown.Item
          as={Link}
          to="/settings"
        >
          {t('app.menu.settings')}
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          as={Link}
          to="/auth/logout"
        >
          {t('app.menu.logout')}
        </NavDropdown.Item>
      </NavDropdown>
    </Navbar>
  )
}
