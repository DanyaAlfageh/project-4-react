
# React Front End : 


## Introduction :
ImagurD is the name of the website. I have tried to mimic imagure basic functionalty hence the name. I have user React Bootstrap to make website responsive and also I have user alot of events to help user navigate the website.


## User Stories:
- An unlogged in user can view three pages Search, Sign up and Sign in
- A signed in user can Upload an image, View an image, View all his images, delete and add tags to his images.
- A signed in user can view an image of another user but can not add any tags to it.
- Tags can be searched with by anyone.
- A signed user can click a tag and be redirected to a gruop of images with this tag

## Code Snippet

### Tag Input on Key Up
```
 onKeyUp = (e) => {
      if (e.which === 32 || e.which === 13) {
        const input = e.target.value.trim().split(' ')
        update(this.props.user, input, this.props.imageId)
          .then(res => console.log(res))
          .catch(err => console.log(err))
        if (input.length === 0 || input[0] === '') return ''
        this.setState({
          tags: { tag: [...this.state.tags.tag, input] }
        })
        e.target.value = ''
      }
    }
```
