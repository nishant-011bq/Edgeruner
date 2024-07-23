'use client'
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function ProfileCompletion({ data }) {
  const getTaskLabel = (label) => {
    if (label === 'name') {
      return 'Add first and last name to your profile'
    } else if (label === 'phone') {
      return 'Add phone number to your profile'
    } else if (label === 'telegram') {
      return 'Setup your telegram account'
    } else if (label === 'upstox') {
      return 'Setup your upstox account'
    } else if (label === 'upstox_auto_login') {
      return 'Enable auto login in your upstox account'
    }
  }

  return (
    <div className="mx-auto mt-2 max-w-6xl lg:px-8">
      <div className="bg-primary p-2 sm:p-4 md:rounded-md">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:gap-0">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <p className="truncate font-medium text-white">
                <span className="hidden md:inline">Complete Your Profile</span>
              </p>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {data.profile_completion.incomplete_steps.map((item) => {
                return (
                  <div
                    className="flex items-start gap-1 md:items-center"
                    key={item}
                  >
                    <InformationCircleIcon className="h-4 w-4 cursor-pointer text-white" />
                    <span className="text-sm text-white">
                      {getTaskLabel(item)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
          <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar
              value={Math.round(data.profile_completion.percent_completed)}
              text={`${Math.round(data.profile_completion.percent_completed)}%`}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 1,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
                // Text size
                textSize: '14px',
                // Colors
                pathColor: 'rgb(156 163 175)',
                textColor: '#ffffff',
              })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
