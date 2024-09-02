import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export default function Settings() {
  const { t, i18n } = useTranslation()

  const handleClick = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div>
      <h1 className="mb-5">{t('settings.title')}</h1>
      <Button
        onClick={() => handleClick('en')}
        variant="outline-primary"
      >
        English
      </Button>{' '}
      <Button
        onClick={() => handleClick('ru')}
        variant="outline-primary"
      >
        Русский
      </Button>
    </div>
  )
}
