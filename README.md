# Creating a Discord Clone using Sendbird UIKit

When you’re looking at implementing a service like Sendbird, one of the things you’ll be looking for is flexibility in shaping the design to match your application. The [Sendbird UIKit](https://sendbird.com/docs/uikit/v1/react/quickstart/send-first-message) is built to be highly customizable.

You may be familiar with [Discord](https://discord.com/). It’s becoming increasingly popular as an online communication platform. With its distinguished look and feel, it’s an ideal example to show how we are able to tailor the UIKit to go with its theme. If you’ve used Discord then you know there are chats based around a large topic or chats that contain a small group of individuals. 

In Sendbird, we call those an [Open Channel](https://sendbird.com/docs/uikit/v1/react/guides/open-channel) and a [Group Channel](https://sendbird.com/docs/uikit/v1/react/guides/group-channel). While there are many similarities between Sendbird and Discord, there are also differences that make them unique. 

The possibilities for customizing UIKit are endless. You’ll be able to go beyond what’s provided to you and build a chat that will complement your creative vision. 

## UIKit default vs. Discord example
![Sendbird Layout](https://github.com/sendbird/sendbird-discord-javascript-demo/blob/main/sendbird-original-layout.png)
![Discord Example](https://github.com/sendbird/sendbird-discord-javascript-demo/blob/main/discord-example-outcome.png)

It’s important to understand what UIKit features you would like to include for users to have access to, what components you do not need, and the visual theme you are looking to implement. After you know what’s necessary for your desired application and have a layout to reference to, you can find the specific UIKit components that provide you with each feature. 

For this Discord example, there will be a Channels List with both Group Channels and Open Channels. Depending on the type of channel being clicked on, the conversation window will render the Open Channel or Group Channel view. Since these are two separate components that have distinct default formats, we have to take different approaches depending on the component we are working with in order to produce the same output. 

## Getting started

First you want to create a new application in your Sendbird dashboard. Within that application, create a user, an open channel and a group channel. On the lefthand sidebar, in the 'Overview' tab you can find the application ID and in the 'Users' tab, click on the user you've created and you can see the user's ID, nickname and access token. These are all key variables you will need to include in your application later on in order to make it run. Learn more about these initial steps on how to [send your first message](https://sendbird.com/docs/uikit/v1/react/quickstart/send-first-message#2-before-you-start).

Open your application and install the Sendbird-UIKit with 'npm install sendbird-uikit --save'. Upon installing the UIKit, create a .env file where you will export your application ID, user ID, nickname, and access token provided from the application you created in your dashboard. These variable names must start with "REACT_APP" (e.g. REACT_APP_APP_ID).

## Let's Dive In
The three overarching components that will be focused on are the channel list, conversation window, and channel settings. 

### Implementing Channel list sidebar
In App.js, we’re going to import the [SendBirdProvider](https://github.com/sendbird/SendBird-UIKIT-JavaScript/tree/master#implement-uikit-to-your-web-app) and have that component wrapped around our CustomizedApp component. CustomizedApp will be the wrapper for our entire application and hold the channel lists as well as the conversation window.

For the channel list sidebar, on the top we want a header to display the current user’s server followed by the list of channels. Using the ‘nickname’ prop being passed through, we can insert an h1 tag inside of the sidebar wrapper being returned and display the current user’s nickname on the top of the channel list. 

Following the server name, we want to display our two types of channels: Group Channels and Open Channels. The CustomizedApp component will return the Group Channel List component (referred to as [ChannelList](https://sendbird.com/docs/uikit/v1/react/guides/group-channel#2-list-channels) from the UIKit or SBChannelList in our example), where you can see the list of Group Channels the user is a part of. Please see additional documentation on [ChannelList](https://github.com/sendbird/sendbird-uikit-react/blob/b7e03febde915a5531b30e0801f13d2e188cc894/SAMPLES.md#import-components-to-customize-uikit). 

Following the Group Channel List, the custom made Open Channel List component (referred to as the [CommunityChannelList](https://gist.github.com/sendbird-community/80f489a8d197e2ad0c04ac515067cbd4)) will appear with the list of the Open Channels that the current user is able to access. Below is the layout of the two components being returned within CustomizedApp.
https://gist.github.com/sendbird-community/2eb1feda242bdf41e1526029fa8b7410 

##### Group Channel displayed in sidebar
Within the ChannelList component, we implement two props: onChannelSelect and [renderChannelPreview](https://github.com/sendbird/sendbird-uikit-react/blob/b7e03febde915a5531b30e0801f13d2e188cc894/SAMPLES.md#channel-preview-item). onChannelSelect sets the current channel we’re clicking on from the Group Channels list. If a Group Channel’s selected, renderChannelPreview will return the [CustomizedChannelPreviewItem](https://github.com/sendbird/sendbird-uikit-react/blob/b7e03febde915a5531b30e0801f13d2e188cc894/SAMPLES.md#customizedchannelpreviewitemjs) component, which displays the layout for the conversation that is clicked on.


##### Open Channel displayed in sidebar
After the Group Channel List and Open Channel List are both successfully rendered, we can start to customize the features that are initially provided by each of the components. These two types of channels provide different default functionalities. When initially implementing the Group Channel List, it automatically provides users with a button to create a new private channel. However, when implementing the Open Channel List, it doesn’t display a button to create a new Open Channel. 

#### Creating an Open Channel
To allow users to create a new Open Channel, we’re going to create a button that will render a form where users can input the new channel’s name and generate the channel once they submit it. To do so, first we’ll add a button in the CommunityChannelList and on click of the button render the custom component, AddCommunityChannel.
https://gist.github.com/sendbird-community/80f489a8d197e2ad0c04ac515067cbd4 

AddCommunityChannel will return the form to create a new Open Channel. By understanding how GroupChannelList renders its form to create a new Group Channel, we can utilize that same code from the UIKit and keep what’s necessary for our Open Channel form. Below’s the alterations made to fit our Open Channel form:
https://gist.github.com/sendbird-community/4ee704fecb5ea5bd6305966c44b9b78b 

To create a new Open Channel, we utilize the createChannel function provided specifically for Open Channels. This can be seen in the above code on lines 19 - 24. Please refer to the documentation about the [createChannel](https://sendbird.com/docs/chat/v3/javascript/guides/open-channel#2-create-a-channel) function.

#### Rendering Open Channel conversation
After the AddCommunityChannel component, the next component returned in the CommunityChannelList is OpenChannelPreview. This component provides the layout for how each channel is displayed within the channel list.
https://gist.github.com/sendbird-community/ab44a06cc4c3131920fd1de9d2ad9ff7 

#### Channel list footer
In the CommunityChannelList after OpenChannelPreview, we’ll insert our footer and tweak the default layout to render a custom component, Profile. Profile will display the current user’s information in a layout that aligns with Discord by displaying the current user’s avatar, name and id number. 
https://gist.github.com/sendbird-community/ae74ed7aa3ea11ee36fce5f0c05d6b51 

#### Custom Implementations
Since Group Channels and Open Channels differ in their layouts, we’ll create two separate CSS files. When we look at the UIKit, we can see there are necessary CSS adjustments to implement along the way in order to shape it like Discord. For our channel list, we apply styling to replace each channel’s avatar with ‘#’ and ensure all channel names listed are lowercase. 

The color scheme will consist of shades of gray and white. The sidebars are darker gray, while the conversation window is a lighter gray. By having Discord open in another window, it will help point out the differences to take note of what format changes should be made.

### Implementing Channel conversation
The next section of the page layout is the channel conversation window. In CustomizedApp, following the Group Channel List and Open Channel List, it will return either the GroupChannelConversation or OpenChannelConversation component depending on which type of channel is being clicked on. This can be seen below within the conversationChatWindow function.
https://gist.github.com/sendbird-community/f729133cd733e6b1599cc7f405a64ba0 

#### Group Channel conversation
GroupChannelConversation returns the Channel and ChannelSettings component from the Sendbird UIKit. 
https://gist.github.com/sendbird-community/7f6398e669d3d2180aaa869fb0bd683b 

[Channel](https://sendbird.com/docs/uikit/v1/react/guides/group-channel#2-chat-in-a-channel), which is referred to as SBConversation in this file, renders the chat window. SBConversation utilizes the renderChatItem prop, which returns our CustomizedMessageitem component. CustomizedMessageitem returns either a FileMessage, UserMessage or AdminMessage component, which each display different designs of a message based on the type of message that it is. 

[ChannelSettings](https://sendbird.com/docs/uikit/v1/react/guides/group-channel#2-configure-channel-settings), which is referred to as SBChannelSettings in this file, is rendered if the user clicks to open the channel’s settings. 

#### Open Channel conversation
OpenChannelConversation contains the [OpenChannel](https://sendbird.com/docs/uikit/v1/react/guides/open-channel#2-chat-in-a-channel) and [OpenChannelSettings](https://sendbird.com/docs/uikit/v1/react/guides/open-channel#2-configure-the-channel-settings) components from the UIKit. OpenChannel renders the Open Channel’s conversation that is clicked on and structures how the chat window appears. Please refer to the documentation for OpenChannel here. OpenChannelSettings is the component for how the channel’s settings are rendered.
https://gist.github.com/sendbird-community/56720de9bce1a8d78908f52114b1a2aa 

#### Conversation customizations
After implementing both types of channel's conversation window and settings sidebar, we can begin working on fixing the design. 

For both channel’s conversation header, we want to apply the same previous CSS to clear the channel’s avatar, replace it with ‘#’ before the channel name and have the channel name displayed in lowercase. Both Group Channel and Open Channel conversations contain an input bar to send a message. Within the input bar, we’ll move the button for users to add file attachments onto the left side and make additional CSS format tweaks as well.

#### Group Channel conversation customization
For Group Channel conversations, when we look at the conversation window, the message format in Discord is different from the UIKit. The default conversation layout has incoming messages on the left hand side, while the current user’s messages being sent are on the right side. Here we’ll implement custom CSS to override the default styling and have all messages aligned on the left side, remove the chat bubble around messages and the background color, and include the current user’s avatar and name next to their message. 

While the UIKit provides Open Channel message’s to have a built-in options button on the right side of every message being sent or received, the Group Channel’s messages do not provide that button. We want to provide the same functionality for the Group Channel messages so we will go ahead to implement that.

Using the same dropdown menu layout that Open Channel utilizes, in the Group Channel’s message we’ll create a button that renders the dropdown options. We want to put the dropdown inside of our UserMessage component that handles the format of how our user messages are displayed. Below shows how the dropdown is placed in UserMessage:
https://gist.github.com/sendbird-community/133927c8692ea2099fca40cc7dbef5e0

For Group Channels, there can be a case where an Admin enters a message. Here the AdminMessage component is rendered and we alter this file to set a custom avatar image for all admins to have so it isn’t blank. 
https://gist.github.com/sendbird-community/f6f49922d841e760f83126b96f9903c9 

#### Open Channel conversation customization
For Open Channel conversations, it naturally has more of an overlap with the Discord layout. The key CSS changes made are for the color scheme and font format.

### Displaying channel settings sidebar 
#### Group Channel settings
On initial render of the Group Channel settings, the user who created the Group Channel has default properties that include an edit button to edit the current channel’s image or name, dropdown options to view the Operators, Members, Muted Members, Banned members along with a Freeze Channel button option or Leave Channel button. 

As a user who did not create the Group Channel, the only available properties shown are the edit button to edit the current channel’s image or name, a dropdown to view Members and a Leave Channel button.

#### Open Channel settings
On the render of the Open Channel settings, the user who created the Open Channel can see a number of properties such as an edit button to edit the current channel’s image or name, the channel’s URL, a dropdown of the participants and a button to delete the channel. A user who did not create the Open Channel can only see the participants in the group.

#### Channel settings customizations 
After implementing the channel settings and utilizing the default features, the only additional changes to make are CSS designs to match the layout for the Discord design. This would include aspects such as the font family, size, color and position.

## Conclusion
With the flexibility of the Sendbird UIKit, we’re able to use the features we want to include within our chat and design it to fit what we envision for our application.
