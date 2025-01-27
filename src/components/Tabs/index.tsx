// components/GlobalTabs/GlobalTabs.tsx
import React from 'react';
import { Tabs } from 'antd';
import { TabsProps } from 'antd';
import './index.scss';

interface GlobalTabsProps extends TabsProps {
	extraContent?: React.ReactNode;
}

const GlobalTabs: React.FC<GlobalTabsProps> = ({
	extraContent,
	children,
	...props
}) => {
	return (
		<div className="tabsWrapper">
			<Tabs
				{...props}
				tabBarExtraContent={extraContent}
				destroyInactiveTabPane
			>
				{children}
			</Tabs>
		</div>
	);
};

export default GlobalTabs;
