import Cookies from 'js-cookie'

export const convertEpochToDate = (epochTime) => {
  const date = new Date(epochTime * 1000 - 60000) // Convert to milliseconds
  return date
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const userLogOut = (pathname) => {
  Cookies.remove('token')
  Cookies.remove('refreshToken')
  Cookies.set('redirect_to', pathname)

  if (typeof window !== 'undefined') {
    window.location.reload()
  }
}

export function getInitials(name) {
  // Split the name into individual words
  const words = name.split(' ')

  // Extract the first letter of each word and concatenate
  const initials = words.map((word) => word.charAt(0)).join('')

  return initials
}

export const customSelectDropdownStyles = () => {
  return {
    control: (base, state) => ({
      color: 'hsl(0, 0%, 100%)',
      ...base,
      cursor: 'pointer',
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      '&:hover': {
        backgroundColor: 'none',
      },
      borderRadius: '.3125rem',
      position: 'relative',
      backgroundColor: 'hsl(0, 0%, 100%)',
      width: '100%',
      border: '.0625rem solid #e7eaf3',
      fontSize: '14px',
    }),
    container: (base) => ({
      ...base,
      width: '100%',
      position: 'relative',
    }),
    menu: () => ({
      width: '100%',
      borderRadius: '.3125rem',
      backgroundColor: 'white',
      border: '1px solid #e7eaf3',
      marginTop: '.5rem',
      position: 'absolute',
      top: '35',
      zIndex: '10',
      fontSize: '14px',
    }),
    menuList: () => ({
      width: '100%',
      padding: 0,
      overflowY: 'scroll',
      maxHeight: '180px',
    }),
    placeholder: () => ({
      marginLeft: '10px',
      marginRight: '2px',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '100%',
      color: '#fff',
      opacity: '0.445',
    }),
    option: (base, state) => ({
      ...base,
      '&:hover': {
        backgroundColor: state.isSelected ? 'F8F8F8' : 'rgba(189,197,209,.3)',
      },
      backgroundColor: state.isSelected ? '#F8F8F8' : '#FFFFFF',
      color: state.isSelected ? '#6e6e6e' : '#010101',
      cursor: 'pointer',
      position: 'relative',
      width: '100%',
    }),
    valueContainer: (base) => ({
      ...base,
      position: 'relative',
      overflow: 'hidden',
      alignItems: 'center',
      width: '100%',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (base) => ({
      ...base,
      display: 'block',
      alignSelf: 'auto',
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      height: '32px',
      width: '32px',
      padding: '7px',
      color: state.isSelected ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 80%)',
    }),
    multiValue: (base, state) => ({
      ...base,
      position: 'relative',
      backgroundColor: '#2b2d34',
      borderColor: 'transparent',
      paddingRight: '1.6125rem',
      float: 'left',
      lineHeight: 'normal',
      whiteSpace: 'pre-line',
      margin: '0.25rem',
      padding: '0.2125rem 0.575rem',
      borderRadius: '4px',
      alignItems: 'center',
      closeMenuOnSelect: false,
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#e8e8e8',
      fontSize: '0.875rem',
      fontWeight: '400',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#90989d',
      paddingLeft: 0,
      paddingRight: 0,
      '&:hover': {
        color: '#333',
        backgroundColor: 'transparent',
      },
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'
      const paddingRight = 0
      const width = '100%'
      const color = 'hsl(0, 0%, 20%)'

      return {
        ...provided,
        opacity,
        transition,
        paddingRight,
        width,
        color,
      }
    },
    input: (base) => ({
      ...base,
      color: '#2b2d34',
    }),
  }
}

export const calculateTotalInvestedValue = (data) => {
  let totalInvestedValue = 0

  data.forEach((entry) => {
    totalInvestedValue += entry.quantity * entry.average_price
  })

  return parseFloat(totalInvestedValue.toFixed(2)).toLocaleString()
}

export const calculateCurrentInvestmentValue = (data) => {
  let currentInvestmentValue = 0

  data.forEach((entry) => {
    currentInvestmentValue += entry.quantity * entry.ltp
  })

  return parseFloat(currentInvestmentValue.toFixed(2)).toLocaleString()
}

export const calculateProfitLossPercentage = (
  totalInvestedValue,
  currentInvestmentValue,
) => {
  const removeCommas = (value) => parseFloat(value.replace(/,/g, ''))

  totalInvestedValue = removeCommas(totalInvestedValue)
  currentInvestmentValue = removeCommas(currentInvestmentValue)

  const profitLoss = currentInvestmentValue - totalInvestedValue
  const percentage = (profitLoss / totalInvestedValue) * 100

  return percentage.toFixed(2)
}
