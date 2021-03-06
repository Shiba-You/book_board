import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import Icon from './Icon'
import { saveArticle, editArticle } from '../utils/article';
import { confirmAndBack } from '../utils/info';

const useStyles = makeStyles(() => ({
  primaryPst: {
    margin: 0,
    top: 'auto',
    right: 40,
    left: 'auto',
    bottom: 40,
    position: 'fixed',
  },
  secondaryPst: {
    margin: 0,
    top: 'auto',
    right: 40,
    left: 'auto',
    bottom: 120,
    position: 'fixed',
  },
  icon: {
    fontSize: '150%',
  }
}));

export default function FloatButton(props) {
  const router = useRouter();
  const { seed, position, artileTitle, content, currentuser, image, articleUid} = props;
  const classes = useStyles();
  const bColor = seed == 'cancel' || seed == 'back' ? 'secondary' : 'primary';
  const pst = position == 0 ? classes.primaryPst : classes.secondaryPst;
  const action = () => {
    switch (seed) {
      case 'add':
        router.push('/new');
        break
      case 'back':
        router.push({
          pathname: '/mypage',
          query: {page: router.query.page}        // TODO: article 表示 page を取得
        });
        break
      case 'cancel':
        confirmAndBack()
        break
      case 'save':
        saveArticle(artileTitle, content, currentuser, image);
        break
      case 'edit':
        router.push(`/articles/edit/${articleUid}`);
        break
      case 'update':
        editArticle(articleUid, artileTitle, content, currentuser, image);
        break
    }

  }

  return (
    <>
      <IconButton
        color={bColor}
        className={pst}
        onClick={() => action(seed)}
      >
        <Icon seed={seed} />
      </IconButton>
    </>
  )
}
