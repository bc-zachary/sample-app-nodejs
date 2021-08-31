import {
    Box,
    BoxProps,
    Button,
    Flex,
    FlexItem,
    H2,
    Small,
    Text,
} from '@bigcommerce/big-design';
import { ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import router from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { useSession } from 'context/session';

interface UpgradeCardProps {
    plan: string;
    popular?: boolean;
    price: string;
    description: string;
}

export const UpgradeCard = ({ plan, popular, price, description }: UpgradeCardProps) => {
    const { setIsUpgrade } = useSession();
    const barColor = plan === 'Plus' ? 'primary70' : 'primary30';

    const handleChoosePlan = () => {
        setIsUpgrade(true);
        router.push('/');
    };

    return (
        <Flex
            flexDirection="column"
            justifyContent="flex-end"
            alignItems="flex-end"
            marginRight="xLarge"
            marginBottom="large"
        >
            {popular && (
                <Box border="box" paddingHorizontal="small">
                    <Small color="secondary70">MOST POPULAR</Small>
                </Box>
            )}
            <StyledCard shadow="floating" paddingBottom="large" paddingTop="none">
                <Box backgroundColor={barColor} padding="xSmall"></Box>
                <Flex flexDirection="column" marginHorizontal="large" marginTop="xxLarge">
                    <Flex alignItems="center">
                        <H2>{plan}</H2>
                        <Box
                            backgroundColor="success50"
                            borderRadius="normal"
                            paddingHorizontal="xxSmall"
                            marginLeft="medium"
                            marginBottom="medium"
                        >
                            <Small color="white">FIRST MONTH FREE</Small>
                        </Box>
                    </Flex>
                    <H2>
                        {`$${price}`}
                        <Small as="span">/month</Small>
                    </H2>
                    <Text>{description}</Text>
                    <Text color="primary" marginBottom="xxLarge">
                        Plan features <ExpandMoreIcon color="primary" />
                    </Text>
                    <FlexItem alignSelf="center">
                        <Button onClick={handleChoosePlan}>Choose plan</Button>
                    </FlexItem>
                </Flex>
            </StyledCard>
        </Flex>
    );
};

const StyledCard = styled(Box)<BoxProps>`
    width: 275px;
`;

