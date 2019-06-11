import Fonts from '../res/values/Fonts'
import Colors from '../res/values/Colors'

const styles = {
  Button: {
    width: 122,
    WebkitBoxSizing: 'content-box',
    MozBoxSizing: 'content-box',
    boxSizing: 'content-box',
    cursor: 'pointer',
    padding: '10px 0',
    WebkitBorderRadius: 100,
    borderRadius: 100,
    font: 'normal 17px/normal ' + Fonts.roboto,
    OTextOverflow: 'clip',
    textOverflow: 'clip',

    '&:active': {
      outline: 'none'
    }
  },
  HighEmphasisButton: {
    border: 'none',
    color: Colors.white,
    background: Colors.orange
  },
  MediumEmphasisButton: {
    border: Colors.doveGray + ' solid 1px',
    color: Colors.black,
    opacity: 0.87,
    background: Colors.white
  }
}

export default styles
