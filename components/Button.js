import { useRouter } from "next/router";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import Icon from './Icon'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 0,
    top: 'auto',
    right: 40,
    bottom: ({ twin }) => twin * 80 + 40,
    left: 'auto',
    position: 'fixed',
  },
  icon: {
    fontSize: '150%',
  }
}));

export default function Button(props) {
  const router = useRouter();
  const { seed, twin } = props;
  const classes = useStyles({ twin });
  const bColor = seed == "cancel" ? "secondary" : "primary";
  const action = () => {
    switch (seed) {
      case 'add':
        router.push('/new');
        break
      case 'cancel':
        // cancel時の操作
        break
      case 'save':
        // save時の操作
        break
      case 'write':
        // write時の操作
        break
    }

  }

  return (
    <>
      <IconButton
        color={bColor}
        className={classes.button}
        onClick={() => action(seed)}
      >
        <Icon seed={seed} />
      </IconButton>
    </>
  )
}
