# Strivve Docs Embedding Videos

## Embedding Videos in Markdown via MarkDoc schema extension

1. Added a react component called react-player, and wrapped it in a nextjs component called Video.jsx.
2. I also extended the schema for MarkDoc, to enable inline markdown callouts to this video component.
3. I also added a new folder /public/videos (referenced in md files as /videos) which will be the location to store video files if served locally.

The result is that you can now simply add videos embedded within the markdown like this:

## Video Examples

```jsx
{% video url="https://www.youtube.com/watch?v=wWgIAphfn2U" /%}
```

```jsx
{% video url="/videos/big_buck_bunny.mp4" /%}
```

## Customizing ReactPlayer

You can change instantiation of the player in the Video.jsx component, be it styling or capbilities, full reference here: [ReactPlayer](https://github.com/cookpete/react-player#props)
