'use client'

import React, { useEffect, useState } from 'react'

import { snippetClassName } from '@/components/doc-snippet'
import { IconCheck, IconDuplicate } from '@irsyadadl/paranoid'
import {
  Button,
  CopyButton,
  Menu,
  MenuContent,
  MenuItem,
  Snippet,
  Tab,
  TabList,
  TabPanel,
  Tabs
} from 'ui'

interface InstallProps {
  items?: string[]
}

const DefaultInstallation: React.FC<InstallProps> = ({
  items = ['react-aria-components']
}) => {
  const commandArgs = `@irsyadadl/d@latest add ${items.join(' ')}`
  const [commandPrefix, setCommandPrefix] = useState('npx')
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isCopied) {
      timer = setTimeout(() => setIsCopied(false), 2000)
    }
    return () => clearTimeout(timer)
  }, [isCopied])

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setIsCopied(true)
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
      })
  }

  const handleAction = (tool: string) => {
    const commandMap = {
      Bun: 'bunx',
      Yarn: 'yarn dlx',
      PNPM: 'pnpm dlx',
      NPM: 'npx'
    }
    // @ts-ignore
    setCommandPrefix(commandMap[tool])
    // @ts-ignore
    copyToClipboard(`${commandMap[tool]} ${commandArgs}`)
  }

  return (
    <div className={snippetClassName}>
      <code>{`${commandPrefix} ${commandArgs}`}</code>
      <div className="pl-3">
        <Menu>
          <CopyButton isCopied={isCopied} />
          <MenuContent showArrow placement="bottom end">
            <MenuItem onAction={() => handleAction('Bun')}>Bun</MenuItem>
            <MenuItem onAction={() => handleAction('Yarn')}>Yarn</MenuItem>
            <MenuItem onAction={() => handleAction('PNPM')}>PNPM</MenuItem>
            <MenuItem onAction={() => handleAction('NPM')}>NPM</MenuItem>
          </MenuContent>
        </Menu>
      </div>
    </div>
  )
}

export { DefaultInstallation }
